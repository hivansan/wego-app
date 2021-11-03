import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

const Checkbox = ({ label, setFilters, filters, traitType, extra }) => {
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

  useEffect(() => {
    if (
      filters.some((trait) => trait.value === label) &&
      filters.some((el) => el.traitType === traitType)
    ) {
      setChecked(true);
    }
  }, []);

  useEffect(() => {
    if (
      filters.some((trait) => trait.value === label) &&
      filters.some((el) => el.traitType === traitType)
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
          value={label}
        />
        {label}
      </div>
      {extra && <small>{extra}</small>}
    </label>
  );
};

export default Checkbox;
