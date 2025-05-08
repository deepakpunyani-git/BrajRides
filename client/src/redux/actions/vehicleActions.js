import axios from "axios";

export const fetchPopularVehicles = () => async (dispatch) => {
  try {
    dispatch({ type: "POPULAR_VEHICLES_REQUEST" });

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles/popularBikes`);

    dispatch({
      type: "POPULAR_VEHICLES_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "POPULAR_VEHICLES_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const fetchVehicles = (filters) => async (dispatch) => {
  try {
    dispatch({ type: 'BIKE_LIST_REQUEST' });

    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/vehicles/search`, filters);  
    dispatch({ type: 'BIKE_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'BIKE_LIST_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};