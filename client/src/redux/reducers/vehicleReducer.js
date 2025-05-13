const initialState = {
    popularVehicles: [],
    vehicles: [],
    loading: false,
    error: null,
  };
  
  export const vehicleReducer = (state = initialState, action) => {
    switch (action.type) {
      case "POPULAR_VEHICLES_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "POPULAR_VEHICLES_SUCCESS":
        return { ...state, loading: false, popularVehicles: action.payload };
  
      case "POPULAR_VEHICLES_FAIL":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const fetchVehicles = (state = initialState, action) => {
    switch (action.type) {
      case 'BIKE_LIST_REQUEST':
        return { ...state, loading: true };
      case 'BIKE_LIST_SUCCESS':
        return { loading: false, vehicles: action.payload.vehicles, error: null };
      case 'BIKE_LIST_FAIL':
        return { loading: false, error: action.payload, vehicles: [] };
      default:
        return state;
    }
  };
  