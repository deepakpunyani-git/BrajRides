const Vehicle = require('../models/Vehicle'); 
const Booking = require('../models/Booking');
const APIContracts = require('authorizenet').APIContracts;
const APIControllers = require('authorizenet').APIControllers;

exports.processPayment = async (req, res) => {
  const {
    vehicleId,
    dateFrom,
    dateTo,
    cardNumber,
    expMonth,
    expYear,
    cvv,
    name,
  } = req.body;

  const userId = req.user._id;

  if (!vehicleId || !dateFrom || !dateTo) {
    return res.status(400).json({ success: false, message: 'Vehicle ID, dateFrom, and dateTo are required.' });
  }

  try {
    const vehicle = await Vehicle.findById(vehicleId).populate('location');
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    const existingBooking = await Booking.findOne({
      vehicle: vehicleId,
      status: "confirmed",
      $or: [
        {
          dateFrom: { $lte: new Date(dateTo) },
          dateTo: { $gte: new Date(dateFrom) }
        }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Vehicle is already booked for these dates.' });
    }

    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const totalAmount = vehicle.price * numberOfDays;

    const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.AUTHORIZE_NET_API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZE_NET_TRANSACTION_KEY);

    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber);
    creditCard.setExpirationDate(`${expYear}-${expMonth}`);
    creditCard.setCardCode(cvv);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(totalAmount);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());
    ctrl.setEnvironment('https://apitest.authorize.net/xml/v1/request.api');

    ctrl.execute(async () => {
      const apiResponse = ctrl.getResponse();
      const response = new APIContracts.CreateTransactionResponse(apiResponse);

      if (response && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
        const transactionResponse = response.getTransactionResponse();
        const transactionId = transactionResponse?.getTransId();

        const last4 = cardNumber.slice(-4);

        const newBooking = new Booking({
          vehicle: vehicle._id,
          user: userId,
          dateFrom,
          dateTo,
          numberOfDays,
          price: vehicle.price,
          totalAmount,
          status: 'confirmed',
          paymentStatus: 'paid',
          transactionId,
          customerName: name,
          cardLast4: last4
        });

        await newBooking.save();

        return res.status(200).json({
          success: true,
          message: 'Payment successful and booking confirmed',
          booking: newBooking,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Payment failed',
          details: response.getMessages()?.getMessage()[0]?.getText(),
        });
      }
    });

  } catch (err) {
    console.error('Payment error:', err);
    return res.status(500).json({ success: false, message: 'Server error during payment' });
  }
};



exports.actionCancelRequest = async (req, res) => {
  const { bookingId, action } = req.body;

  if (!['approve', 'reject'].includes(action)) {
    return res.status(400).json({ message: 'Invalid action' });
  }

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (!booking.cancelRequest) {
      return res.status(400).json({ message: 'No cancel request found' });
    }

    booking.cancelRequestStatus = action === 'approve' ? 'approved' : 'rejected';
    booking.cancelRequestActionBy = req.user._id;
    booking.cancelRequestActionAt = new Date();

    if (action === 'approve') {
      booking.status = 'cancelled';

      if (booking.transactionId) {
        const refundAmount = (booking.totalAmount * 0.9).toFixed(2); // refund 90%

        const merchantAuthentication = new APIContracts.MerchantAuthenticationType();
        merchantAuthentication.setName(process.env.AUTHORIZE_NET_API_LOGIN_ID);
        merchantAuthentication.setTransactionKey(process.env.AUTHORIZE_NET_TRANSACTION_KEY);

        const creditCard = new APIContracts.CreditCardType();
        creditCard.setCardNumber(booking.cardLast4 ? `XXXX${booking.cardLast4}` : 'XXXX1111'); 
        creditCard.setExpirationDate('XXXX');

        const paymentType = new APIContracts.PaymentType();
        paymentType.setCreditCard(creditCard);

        const transactionRequest = new APIContracts.TransactionRequestType();
        transactionRequest.setTransactionType(APIContracts.TransactionTypeEnum.REFUNDTRANSACTION);
        transactionRequest.setPayment(paymentType);
        transactionRequest.setRefTransId(booking.transactionId);
        transactionRequest.setAmount(refundAmount);

        const refundRequest = new APIContracts.CreateTransactionRequest();
        refundRequest.setMerchantAuthentication(merchantAuthentication);
        refundRequest.setTransactionRequest(transactionRequest);

        const ctrl = new APIControllers.CreateTransactionController(refundRequest.getJSON());
        ctrl.setEnvironment('https://apitest.authorize.net/xml/v1/request.api');

        await new Promise((resolve, reject) => {
          ctrl.execute(() => {
            const apiResponse = ctrl.getResponse();
            const response = new APIContracts.CreateTransactionResponse(apiResponse);

            if (response.getMessages().getResultCode() !== APIContracts.MessageTypeEnum.OK) {
              return reject(new Error('Refund failed: ' + response.getMessages().getMessage()[0].getText()));
            }
            resolve();
          });
        });
      }
    }

    await booking.save();
    res.json({ message: `Cancel request ${action}d successfully` });

  } catch (error) {
    console.error('Cancel request error:', error);
    res.status(500).json({ message: 'Server error while processing cancel request' });
  }
};