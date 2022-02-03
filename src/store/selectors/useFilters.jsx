import { useSelector, shallowEqual } from 'react-redux';

export const useStoreFilter = () => useSelector(
  state => state.storeFilters,
  shallowEqual
);
