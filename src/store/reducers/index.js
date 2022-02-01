import { combineReducers } from 'redux';
import accountReducer from './accountReducer';

// Setting up for possible future expansion of the store.
const rootReducer = combineReducers({
    account: accountReducer,
  });

export default rootReducer;


