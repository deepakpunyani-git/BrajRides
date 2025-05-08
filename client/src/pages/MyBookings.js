import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button, Pagination, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBookings, requestBookingCancel } from '../redux/actions/bookingActions';
import { fetchLocations } from '../redux/actions/locationActions';
import { toast } from 'react-toastify';

const MyBookings = () => {
  
  const dispatch = useDispatch();
  const { bookings, loading, pagination } = useSelector(state => state.booking);
  const { locations } = useSelector(state => state.locations || {}); 

  const [filters, setFilters] = useState({
    status: '',
    location: '',
    page: 1,
    limit: 5,
    sortBy: 'createdAt',
    order: 'desc'
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMyBookings(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const openCancelModal = (bookingId, dateFrom) => {
    const hoursLeft = (new Date(dateFrom) - new Date()) / (1000 * 60 * 60);
    if (hoursLeft < 24) {
                toast.dismiss();
      
      toast.error('Cannot request cancellation within 24 hours of start date.');
      return;
    }
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const submitCancelRequest = () => {
    if (!cancelReason.trim()) {
                toast.dismiss();
      
      toast.error('Please enter a reason.');
      return;
    }
    dispatch(requestBookingCancel(selectedBookingId, cancelReason)).then(() => {
      dispatch(getMyBookings(filters)); 
      toast.dismiss();

      toast.success('Cancellation request submitted.');
    });
    setShowModal(false);
    setCancelReason('');
  };

  const totalPages = pagination?.totalPages || 1;

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Bookings</h2>
      <Row className="mb-3">
  <Col>
    <div className="alert alert-info mb-0 small">
      <strong>Note:</strong> You cannot request cancellation within <strong>24 hours</strong> of the booking start date.
      If approved, <strong>10% of the booking amount</strong> will be deducted as a cancellation fee.
    </div>
  </Col>
</Row>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Booking Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive className="rounded shadow-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Vehicle</th>
                <th>Location</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
                <th>Cancel Request</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={b._id}>
                  <td>{(filters.page - 1) * filters.limit + index + 1}</td>
                  <td>{b.vehicle.brand} {b.vehicle.model}</td>
                  <td>{b.vehicle.location.name}</td>
                  <td>{new Date(b.dateFrom).toLocaleDateString()} - {new Date(b.dateTo).toLocaleDateString()}</td>
                  <td>{b.numberOfDays}</td>
                  <td>₹{b.price}</td>
                  <td>₹{b.totalAmount}</td>
                  <td className="text-capitalize">{b.status}</td>
                  <td>
                    {b.cancelRequest ? (
                      <>
                        <span className="badge bg-warning text-dark">Requested</span>
                        <br />
                        <small>Status: {b.cancelRequestStatus || '-'}</small>
                        <br />
                        {b.cancelRequestedAt && (
                          <small>Request At: {new Date(b.cancelRequestedAt).toLocaleString()}</small>
                        )}
                      </>
                    ) : '-'}
                  </td>
                  <td>
                    {!b.cancelRequest && b.status === 'confirmed' && (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => openCancelModal(b._id, b.dateFrom)}
                      >
                        Request Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination>
              {[...Array(totalPages).keys()].map(i => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === filters.page}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Request Booking Cancellation</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Reason for cancellation</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="danger" onClick={submitCancelRequest}>Submit Request</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyBookings;
