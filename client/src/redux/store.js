import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import locationReducer from "./reducers/locationReducer";
import searchReducer from './reducers/searchReducer';
import { vehicleReducer , fetchVehicles } from "./reducers/vehicleReducer";
import bookingReducer from './reducers/bookingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  vehicleData: vehicleReducer,
  locations: locationReducer,
  search:searchReducer,
  vehicles: fetchVehicles,
  booking: bookingReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
