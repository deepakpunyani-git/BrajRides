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
                toast.dismiss();

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
      navigate('/my-bookings'); 
      return { success: true, bookingId: res.data.booking._id }; 
    } else {
      toast.error('Payment failed: ' + res.data.message);
      return { success: false, error: res.data.message }; 
    }
  } catch (err) {
    toast.error('Something went wrong during payment');
    return { success: false, error: err.message || 'Unexpected error' }; 
  }
};

export const getMyBookings = (filters) => async (dispatch) => {
  dispatch({ type: 'BOOKINGS_LOADING' });

  try {
    const token = localStorage.getItem('authToken');

    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.location) params.append('location', filters.location);
    params.append('page', filters.page);
    params.append('limit', filters.limit);
    params.append('sortBy', filters.sortBy);
    params.append('order', filters.order);

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/my-bookings?${params.toString()}`, {
      headers: { Authorization: token },
    });

    dispatch({
      type: 'SET_BOOKINGS',
      payload: {
        bookings: res.data.bookings,
        pagination : res.data.pagination,
      },
    });
  } catch (err) {
                toast.dismiss();
    toast.error('Failed to load bookings');
    dispatch({
      type: 'SET_BOOKINGS',
      payload: { bookings: [], pagination : []},
    });
  }
};

export const requestBookingCancel = (id, reason) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/bookings/${id}/cancel-request`, { reason }, {
      headers: { Authorization: token }
    });
                toast.dismiss();

    if (res.data.success) {
      //toast.success('Cancellation request submitted');
      //dispatch(getMyBookings(getState().booking.filters)); 
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error('Cancellation failed');
  }
};
