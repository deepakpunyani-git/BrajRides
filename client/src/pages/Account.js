// src/pages/Account.js
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Pagination, Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBookings, cancelBookingRequest } from '../redux/actions/bookingActions';
import { toast } from 'react-toastify';

const Account = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector(state => state.booking);

  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  const filtered = bookings?.filter(booking =>
    !filter || booking.status.toLowerCase() === filter.toLowerCase()
  ) || [];

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentBookings = filtered.slice((page - 1) * perPage, page * perPage);

  const handleCancel = (id, dateFrom) => {
    const hoursLeft = (new Date(dateFrom) - new Date()) / (1000 * 60 * 60);
    if (hoursLeft < 12) {
      return toast.error('Cancellations allowed only 12+ hours before booking start.');
    }

    dispatch(cancelBookingRequest(id));
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Bookings</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row>
            {currentBookings.map(b => (
              <Col md={6} key={b._id} className="mb-4">
                <Card className="shadow-sm border-0 rounded-4">
                  <Card.Body>
                    <Card.Title>{b.vehicle.brand} {b.vehicle.model}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {b.vehicle.location.name}<br />
                      <strong>From:</strong> {new Date(b.dateFrom).toLocaleString()}<br />
                      <strong>To:</strong> {new Date(b.dateTo).toLocaleString()}<br />
                      <strong>Status:</strong> <span className="text-capitalize">{b.status}</span><br />
                      <strong>Amount:</strong> ₹{b.totalAmount}
                    </Card.Text>
                    {b.status === 'upcoming' && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCancel(b._id, b.dateFrom)}
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <Pagination>
              {[...Array(totalPages).keys()].map(i => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

export default Account;
