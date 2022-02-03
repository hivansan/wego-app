import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setStoreFilter } from '../store/actions/actionFilters';
// import { flushSync } from 'react-dom';

const Checkbox = ({ label, setFilters, filters, traitType, extra }) => {
  const [checked, setChecked] = useState(false);
  // Save the account to redux
  const dispatch = useDispatch();
  const _setFilters = React.useCallback(
    storeFilter => dispatch(setStoreFilter(storeFilter)),
    [dispatch]
  );

  const onChange = () => {
    if (checked) {
      let newFilters = filters.filter(trait => trait.value !== label || trait.traitType !== traitType);
      setFilters(newFilters);
      _setFilters(newFilters);
      return setChecked(false);
    }
    setFilters(() => {
      // const obj = {};
      setFilters([...filters, { traitType, value: label }]);
      _setFilters([...filters, { traitType, value: label }]);
    });

    setChecked(true);
  };

  useEffect(() => {
    if (
      filters.some(trait => trait.traitType === traitType && trait.value === label)
    ) {
      setChecked(true);
    }
  }, []);

  useEffect(() => {

    if (
      filters.some(trait => trait.traitType === traitType && trait.value === label)
    ) {
      return setChecked(true);
    }
    setChecked(false);
  }, [filters]);

  return (
    <label className='checkbox-label'>
      <div>
        <input
          className='checkbox'
          type='checkbox'
          checked={checked}
          onChange={onChange}
          value={label || ''}
        />
        {label ? label : 'None'}
      </div>
      {extra && <small>{extra}</small>}
    </label>
  );
};

export default Checkbox;
