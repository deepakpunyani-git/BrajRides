import React, { useState , useEffect  } from 'react';
import { Container, Row, Col, Form, Button, Carousel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setSearchFilter } from '../redux/actions/searchActions'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import './Hero.css';

const HeroSection = ({ locations }) => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (startDate) {
      if (!endDate || endDate < startDate) {
        setEndDate(startDate);
      }
    }
  }, [startDate, endDate]);

  const formatDate = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const handleRideNow = () => {
    if (!location || !startDate) {
      toast.dismiss();
      toast.error('Location and Start Date are required.');
      return;
    }

    if (endDate && endDate < startDate) {
      toast.dismiss();
      toast.error('End Date cannot be earlier than Start Date.');
      return;
    }

    dispatch(setSearchFilter({
      location,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    }));

    navigate('/pricing');
  };
  return (
    <div className="hero-section">
    <Carousel controls={false} indicators={false} interval={3000}>
      {[1, 2, 3].map((num) => (
        <Carousel.Item key={num}>
          <img
            className="d-block w-100 hero-image"
            src={`${process.env.PUBLIC_URL}/slider${num}.jpg`}
            alt={`Slide ${num}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
      <div className="hero-content">
        <Container>
          <Row>
            <Col className="text-center">
              <h1 className="hero-title">LONG TERM RENTALS</h1>
              <p className="hero-subtitle">CHOOSE FROM MONTHLY & QUARTERLY PLANS</p>

              <Form className="hero-form d-flex justify-content-center flex-wrap">
                <Form.Group controlId="formLocation" className="mx-2">
                  <Form.Control
                    as="select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map((loc) => (
                      <option key={loc._id} value={loc._id}>
                        {loc.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mx-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                    placeholderText="Start Date"
                    minDate={new Date()}
                    dateFormat="dd-MM-YYYY"
                  />
                </Form.Group>

                <Form.Group className="mx-2">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-control"
                    placeholderText="End Date"
                    minDate={startDate || new Date()}
                    dateFormat="dd-MM-YYYY"
                  />
                </Form.Group>

                <Button className="mx-2 ride-now-btn" onClick={handleRideNow}>
                  RIDE NOW
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;

