import { SET_SEARCH_FILTER } from '../actions/searchActions';

const initialState = {
  location: '',
  startDate: '',
  endDate: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;