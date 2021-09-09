import React, { useCallback, useState } from 'react';
import _ from 'lodash';

export const useDebounce = (value = null, wait = 1000) => {
  const [state, setState] = useState(value);

  const debounce = useCallback(
    _.debounce((value) => {
      setState(value);
    }, wait),
    []
  );

  const setDebouncedState = (value) => {
    debounce(value);
  };

  return [state, setDebouncedState];
};
