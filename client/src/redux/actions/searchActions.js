export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';

export const setSearchFilter = (payload) => ({
  type: SET_SEARCH_FILTER,
  payload,
});


export const clearSearchFilter = () => ({
  type: 'CLEAR_SEARCH_FILTER'
});
