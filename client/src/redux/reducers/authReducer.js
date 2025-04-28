const token = localStorage.getItem('authToken');
const user = localStorage.getItem('authUser');

const initialState = {
  loading: false,
  isAuthenticated: !!token,
  token: token || null,
  user: user ? JSON.parse(user) : null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'AUTH_REQUEST':
          return { ...state, loading: true, error: null };
      case 'OTP_SENT_SUCCESS':
          return { ...state, loading: false };
      case 'AUTH_SUCCESS':
          return {
              ...state,
              loading: false,
              user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
              error: null,
          };
      case 'AUTH_FAIL':
          return {
              ...state,
              loading: false,
              error: action.payload,
              isAuthenticated: false,
          };
      case 'LOGOUT':
        return {
            ...state,
            isAuthenticated: false,
            token: null,
            user: null,
          };
      default:
          return state;
  }
};
