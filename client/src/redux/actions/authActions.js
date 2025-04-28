export const sendOtp = (phone) => async (dispatch) => {
  try {
      dispatch({ type: 'AUTH_REQUEST' });

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.success) {
          dispatch({ type: 'OTP_SENT_SUCCESS' });
          return true;
      } else {
          dispatch({ type: 'AUTH_FAIL', payload: data.message });
          return false;
      }
  } catch (err) {
      dispatch({ type: 'AUTH_FAIL', payload: 'Network error' });
      return false;
  }
};

export const verifyOtp = (phone, otp) => async (dispatch) => {
  try {
      dispatch({ type: 'AUTH_REQUEST' });

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              token: data.token,
              user: data.user,
            },
          });
         localStorage.setItem('authToken', data.token);
          localStorage.setItem('authUser', JSON.stringify(data.user));
        } else {
          dispatch({ type: 'AUTH_FAIL', payload: data.message });
      }
  } catch (err) {
      dispatch({ type: 'AUTH_FAIL', payload: 'Network error' });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');

  
  dispatch({ type: 'LOGOUT' });
};
