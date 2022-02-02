import * as actionTypes from './actionTypes';

export function setStoreFilter(storeFilter) {
  const action = {
    type: actionTypes.SET_FILTERS,
    payload: storeFilter,
  };

  return dispatch => {
    dispatch(action);
  };
}
