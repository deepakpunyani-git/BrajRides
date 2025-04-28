import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form  , Alert} from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt, FaBolt, FaBicycle } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../redux/actions/vehicleActions';
import { fetchLocations } from '../redux/actions/locationActions';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import '../assets/css/pricing.css';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { location: reduxLocation, startDate: reduxStart, endDate: reduxEnd } = useSelector((state) => state.search);
  const { locations } = useSelector((state) => state.locations || {}); 
  const { loading, vehicles, error } = useSelector((state) => state.vehicles || {}); 
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('All');
  const [isElectric, setIsElectric] = useState('All');
  const [showFiltered, setShowFiltered] = useState(false);

    useEffect(() => {
      if (startDate) {
        if (!endDate || endDate < startDate) {
          setEndDate(startDate);
        }
      }
    }, [startDate, endDate]);
    

  useEffect(() => {
    dispatch(fetchLocations());

    if (reduxLocation && reduxStart && reduxEnd) {
      setLocation(reduxLocation);
      setStartDate(new Date(reduxStart));
      setEndDate(new Date(reduxEnd));
      setShowFiltered(true);

      dispatch(fetchVehicles({
        location: reduxLocation,
        startDate: reduxStart,
        endDate: reduxEnd
      }));
    }
  }, [dispatch, reduxLocation, reduxStart, reduxEnd]);

  const handleFilterChange  = () => {
          toast.dismiss();
    
    if (!location || !startDate || !endDate) {
      toast.error('Please fill all required fields');
      setShowFiltered(false);
      return;
    }

    const filters = {
      location,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };

    if (type !== 'All') filters.type = type;
    if (isElectric !== '') filters.isElectric = isElectric === 'Yes';

    dispatch(fetchVehicles(filters));
    setShowFiltered(true);
    toast.success('Filters applied!');
  };


  const handleResetFilters = () => {
    setLocation('');
    setStartDate('');
    setEndDate('');
    setType('All');
    setIsElectric('All');
    setShowFiltered(false);
          toast.dismiss();
    
    toast.info('Filters reset!');
  };

  const handleBookRide = (vehicle) => {
    const bookingData = {
      vehicleId: vehicle._id,
      vehicle,
      location,
      startDate,
      endDate,
      type,
      isElectric,
      bookingDate: new Date().toISOString()
    };
  
    localStorage.setItem('bookedVehicle', JSON.stringify(bookingData));
  
    if (!user) {
      localStorage.setItem('redirectAfterLogin', '/checkout');
      toast.info('Please login to continue booking.');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="pricing-page">
      <Row className="filters-section">
        <Col md={3} className="sidebar">
          <h4>Filters</h4>

          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <FaMapMarkerAlt size={20} className="mr-2" />
              <span>Location</span>
              <Form.Control
                as="select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.name}
                  </option>
                ))}
              </Form.Control>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <FaCalendarAlt size={20} className="mr-2" />
              <span> Start Date </span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="form-control"
                placeholderText="Start Date"
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
              />
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <FaCalendarAlt size={20} className="mr-2" />
              <span>End Date</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="form-control"
                placeholderText="End Date"
                minDate={startDate || new Date()}
                dateFormat="dd-MM-yyyy"
              />
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <FaBicycle size={20} className="mr-2" /> 
               <span>Type:</span>
               <Form.Control
    as="select"
    value={type}
    onChange={(e) => setType(e.target.value)}
  >
    <option value="">Select</option>
    <option value="bike">Bike</option>
    <option value="scooty">Scooty</option>
  </Form.Control>
            </Card.Body>
          </Card>

          {/* Electric Filter */}
          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <FaBolt size={20} className="mr-2" />
              <span>Electric: </span>
              <Form.Control
    as="select"
    value={isElectric}
    onChange={(e) => setIsElectric(e.target.value)}
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </Form.Control>
            </Card.Body>
          </Card>

          <div className="d-grid gap-2">
  <Button variant="primary" onClick={handleFilterChange}>
    Apply Filters
  </Button>
  <Button variant="secondary" onClick={handleResetFilters}>
    Reset Filters
  </Button>
</div>
        </Col>

        <Col md={9}>
          <Container className="py-5 pricing-container">
            <h2 className="text-center mb-4">Available Vehicles</h2>

            {loading ? (
              <div className="text-center"><Spinner animation="border" /></div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : showFiltered ? (
              vehicles && vehicles.length > 0 ? (
                <Row>
                  {vehicles.map((vehicle) => (
                    <Col md={4} sm={6} key={vehicle._id} className="mb-4">
                      <Card className="h-100 shadow">
                        <Card.Img variant="top" src={vehicle.imageUrl} alt={`${vehicle.brand} ${vehicle.model}`} />
                        <Card.Body>
                          <Card.Title>{`${vehicle.brand} ${vehicle.model}`}</Card.Title>
                          <Card.Text>
                            <strong>Location:</strong> {vehicle.location.name}<br />
                            <strong>Daily Price:</strong> ₹{vehicle.price}<br />
                            <strong>Type:</strong> {vehicle.type}<br />
                            <strong>Electric:</strong> {vehicle.isElectric ? 'Yes' : 'No'}
                          </Card.Text>
                          <Button
  variant="success"
  className="mt-2 w-100"
  onClick={() => handleBookRide(vehicle)}
>
  Book Ride
</Button>
                        </Card.Body>
                        
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-center text-danger">No vehicles found for selected filters.</p>
              )
            ) : (
              <p className="text-center text-muted">Please select filters above to view available vehicles.</p>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Pricing;
