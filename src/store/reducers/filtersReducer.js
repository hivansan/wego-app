
import filtersState from '../states/filtersState';
import { SET_FILTERS } from '../actions/actionTypes';

const STORE_INIT_FILTERS = {
  storeFilter: filtersState,
};

const filtersReducer = (
  state = STORE_INIT_FILTERS.storeFilter,
  action
) => {
  switch (action.type) {
    case SET_FILTERS:
      return { storeFilter: action.payload };
    default:
      break;
  }
  return state;
};

export default filtersReducer;
