import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import filtersReducer from './filtersReducer';

// Setting up for possible future expansion of the store.
const rootReducer = combineReducers({
  account: accountReducer,
  storeFilters: filtersReducer,
});

export default rootReducer;


