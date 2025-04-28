import axios from "axios";

export const FETCH_LOCATIONS_REQUEST = "FETCH_LOCATIONS_REQUEST";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

export const fetchLocations = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LOCATIONS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/locations/list`);

    dispatch({
      type: FETCH_LOCATIONS_SUCCESS,
      payload: data?.data || []   
     });
  } catch (error) {
    dispatch({
      type: FETCH_LOCATIONS_FAILURE,
      payload: error.message,
    });
  }
};
