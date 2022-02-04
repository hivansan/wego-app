
import { useSelector, shallowEqual } from 'react-redux';

export const useAccount = () =>  useSelector(
    state => state.account,
    shallowEqual
  );
