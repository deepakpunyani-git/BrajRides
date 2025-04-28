import React, { useEffect, useRef, useState } from 'react';
import { Card, Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setBookingData, clearBookingData, completePayment } from '../redux/actions/bookingActions';

const Checkout = () => {
  const [card, setCard] = useState({ name: '', number: '', exp: '', cvv: '' });
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const expRef = useRef(null);
  const cvvRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bookingData } = useSelector(state => state.booking);

  useEffect(() => {
    if (!bookingData) {
      const stored = localStorage.getItem('bookedVehicle');
      if (stored) {
        dispatch(setBookingData(JSON.parse(stored)));
      } else {
        toast.dismiss();
        toast.error('No booking data found!');
        navigate('/pricing');
      }
    }
  }, [bookingData, dispatch, navigate]);

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 6)
      .replace(/(\d{2})(\d{0,4})/, (match, m, y) => (y ? `${m}/${y}` : m));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === 'number') {
      formatted = formatCardNumber(value);
      if (formatted.replace(/\s/g, '').length === 16) expRef.current?.focus();
    }
    if (name === 'exp') {
      formatted = formatExpiry(value);
      if (formatted.length === 7) cvvRef.current?.focus();
    }
    if (name === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 4);
    }

    setCard({ ...card, [name]: formatted });
  };

  const validateCard = () => {
    const { name, number, exp, cvv } = card;
    if (!name || !number || !exp || !cvv) {
      toast.dismiss();
      toast.error('Please fill in all payment fields.');
      return false;
    }

    const plainCardNumber = number.replace(/\s/g, '');
    if (!/^\d{16}$/.test(plainCardNumber)) {
      toast.dismiss();
      toast.error('Card number must be 16 digits.');
      return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      toast.dismiss();
      toast.error('CVV must be 3 or 4 digits.');
      return false;
    }

    if (!/^\d{2}\/\d{4}$/.test(exp)) {
      toast.dismiss();
      toast.error('Expiry format should be MM/YYYY');
      return false;
    }

    const [expMonth, expYear] = exp.split('/').map(Number);
    const expiryDate = new Date(expYear, expMonth - 1, 1);
    const now = new Date();
    now.setDate(1);
    if (expiryDate < now) {
      toast.dismiss();
      toast.error('Card expiry date is in the past.');
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!confirmChecked) {
      toast.dismiss();
      toast.error('Please confirm booking to proceed.');
      return;
    }

    if (!validateCard()) return;

    setLoading(true);

    const cardPayload = {
      ...card,
      number: card.number.replace(/\s/g, '')
    };

    const result = await dispatch(completePayment(cardPayload, navigate));
    console.log(result,'result')
    setLoading(false);

    if (result.success) {
           setCard({ name: '', number: '', exp: '', cvv: '' });
     setConfirmChecked(false);
      localStorage.removeItem('bookedVehicle');
     setTimeout(() => navigate('/account'), 250);

    }
  };

  const cancelBooking = () => {
    localStorage.removeItem('bookedVehicle');
    dispatch(clearBookingData());
    toast.dismiss();
    toast.info('Booking cancelled.');
    navigate('/pricing');
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Checkout</h2>

      {bookingData && (
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow border-0 rounded-4">
              <Card.Img
                variant="top"
                src={bookingData.vehicle.imageUrl || '/default-bike.jpg'}
                alt="Vehicle"
                className="rounded-top-4"
              />
              <Card.Body>
                <Card.Title>{`${bookingData.vehicle.brand} ${bookingData.vehicle.model}`}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {bookingData.vehicle.location?.name || bookingData.location}<br />
                  <strong>Type:</strong> {bookingData.type}<br />
                  <strong>Electric:</strong> {bookingData.isElectric === 'Yes' ? 'Yes' : 'No'}<br />
                  <strong>Price Per Day:</strong> ₹{bookingData.vehicle.price}<br />
                  <strong>From:</strong> {new Date(bookingData.startDate).toLocaleDateString()}<br />
                  <strong>To:</strong> {new Date(bookingData.endDate).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="shadow p-4 border-0 rounded-4">
              <h4 className="mb-3">Payment Details</h4>

              <Form.Group className="mb-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={card.name}
                  onChange={handleChange}
                  minLength={2}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="number"
                  placeholder="4111 1111 1111 1111"
                  value={card.number}
                  onChange={handleChange}
                  minLength={19}
                  maxLength={19}
                  required
                />
              </Form.Group>

              <Row className="mb-4">
                <Col md={6} className="mb-3">
                  <Form.Label className="fw-bold">Expiry Date (MM/YYYY)</Form.Label>
                  <Form.Control
                    type="text"
                    name="exp"
                    placeholder="MM/YYYY"
                    value={card.exp}
                    onChange={handleChange}
                    className="p-3"
                    ref={expRef}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label className="fw-bold">CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={card.cvv}
                    onChange={handleChange}
                    className="p-3"
                    ref={cvvRef}
                    minLength={3}
                    maxLength={4}
                    required
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="I confirm the booking details are correct"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                />
              </Form.Group>

              <div className="d-flex flex-wrap gap-2">
                <Button variant="primary" onClick={handlePayment} disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Processing...
                    </>
                  ) : (
                    'Pay & Book Now'
                  )}
                </Button>

                <Button variant="outline-danger" onClick={cancelBooking} disabled={loading}>
                  Cancel
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Checkout;
