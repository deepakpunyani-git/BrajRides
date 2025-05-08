const initialState = {
  bookingData: null,
  bookings: [],
  pagination: { totalPages: 1, page: 1, limit: 5, total: 0 },
  loading: false,
  filters: {
    status: '',
    location: '',
    page: 1,
    limit: 5,
    sortBy: 'createdAt',
    order: 'desc'
  }
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...state,
        bookings: action.payload.bookings,
        pagination: action.payload.pagination || initialState.pagination,
        loading: false
      };
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
