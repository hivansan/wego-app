import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

const Checkbox = ({
  label,
  onIsChecked,
  onIsNotChecked,
  setFilters,
  filters,
  traitType,
}) => {
  const [checked, setChecked] = useState(false);

  const onChange = () => {
    if (checked) {
      setFilters(() => filters.filter(({ value }) => value !== label));
      return setChecked(false);
    }
    setFilters(() => {
      const obj = {};
      setFilters([...filters, { traitType, value: label }]);
    });

    setChecked(true);
  };

  //deseable obj  {traitType : [values]}

  useEffect(() => {
    if (filters.some((trait) => trait.value === label)) {
      setChecked(true);
    }
  }, []);

  useEffect(() => {
    if (!filters.some((trait) => trait.value === label)) {
      setChecked(false);
    }
  }, [filters]);

  return (
    <label className='checkbox-label'>
      <input
        className='checkbox'
        type='checkbox'
        checked={checked}
        onChange={onChange}
        value={label}
      />
      {label}
    </label>
  );
};

export default Checkbox;
