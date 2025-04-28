import axios from 'axios';
import { toast } from 'react-toastify';

export const setBookingData = (data) => ({
  type: 'SET_BOOKING_DATA',
  payload: data,
});

export const clearBookingData = () => ({
  type: 'CLEAR_BOOKING_DATA',
});

export const completePayment = (card, navigate) => async (dispatch, getState) => {
  const { bookingData } = getState().booking;

  if (!bookingData) {
    toast.error('No booking data.');
    return { success: false, error: 'No booking data' };
  }

  const [expMonth, expYear] = card.exp.split('/').map(v => v.trim());

  const payload = {
    amount: bookingData.vehicle.price,
    cardNumber: card.number,
    expMonth,
    expYear,
    cvv: card.cvv,
    name: card.name,
    vehicleId: bookingData.vehicle._id,
    dateFrom: bookingData.startDate,
    dateTo: bookingData.endDate,
  };

  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/booking/payment`, payload, {
      headers: { Authorization: token },
    });

    if (res.data.success) {
      dispatch(clearBookingData());
      toast.success(`Payment successful! Booking ID: ${res.data.booking._id}`);
      return { success: true, bookingId: res.data.booking._id }; 
    } else {
      toast.error('Payment failed: ' + res.data.message);
      return { success: false, error: res.data.message }; 
    }
  } catch (err) {
    toast.error('Something went wrong during payment.');
    return { success: false, error: err.message || 'Unexpected error' }; 
  }
};



export const getMyBookings = () => async (dispatch) => {
  dispatch({ type: 'BOOKINGS_LOADING' });
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/me`, {
      headers: { Authorization: token }
    });

    dispatch({
      type: 'SET_BOOKINGS',
      payload: res.data.bookings
    });
  } catch (err) {
    toast.error('Failed to load bookings');
    dispatch({ type: 'SET_BOOKINGS', payload: [] });
  }
};

export const cancelBookingRequest = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/bookings/${id}/cancel`, {}, {
      headers: { Authorization: token }
    });

    if (res.data.success) {
      toast.success('Booking cancelled successfully');
      dispatch(getMyBookings());
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error('Cancellation failed');
  }
};