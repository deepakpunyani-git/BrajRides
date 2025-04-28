const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const { APIContracts, APIControllers } = require('authorizenet');

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
    amount
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
      $or: [
        { dateFrom: { $lte: new Date(dateTo) }, dateTo: { $gte: new Date(dateFrom) } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Vehicle is already booked for these dates.' });
    }

    // Calculate total days and amount
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const totalAmount = vehicle.price * numberOfDays;

    // Authorize.Net setup
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
      if (response != null && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
        const transactionResponse = response.getTransactionResponse();
        const transactionId = transactionResponse?.getTransId();

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
