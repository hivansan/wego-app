
import accountState from '../states/accountState';
import { SET_ACCOUNT } from '../actions/actionTypes';

const STORE_INIT_CONSTANTS = {
  account: accountState,
};

const accountReducer = (
  account = STORE_INIT_CONSTANTS.account,
  action
) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return { account: action.payload };
    default:
      break;
  }
  return account;
};

export default accountReducer;
