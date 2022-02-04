import * as actionTypes from './actionTypes';

export function setAccount(account) {
  const action = {
    type: actionTypes.SET_ACCOUNT,
    payload: account,
  };

  return dispatch => {
    dispatch(action);
  };
}
