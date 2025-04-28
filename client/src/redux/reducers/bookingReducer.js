const initialState = {
    bookingData: null,
    bookings: [],
    loading: false,

  };
  
  export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_BOOKINGS':
        return { ...state, bookings: action.payload, loading: false };
      case 'BOOKINGS_LOADING':
        return { ...state, loading: true };
      case 'SET_BOOKING_DATA':
        return { ...state, bookingData: action.payload };
      case 'CLEAR_BOOKING_DATA':
        return { ...state, bookingData: null };
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  