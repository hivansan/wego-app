import React, { useState, useEffect } from 'react';
import DarkPrimaryButton from '../../atoms/darkPrimaryButton';

const RangeFilters = ({ filter }) => {
  const [value, setValue] = useState(['', '']);

  const handleChangeMinValue = (e) => {
    setValue([e.target.value, value[1]]);
  };

  const handleChangeMaxValue = (e) => {
    setValue([value[0], e.target.value]);
  };

  const onApply = () => {
    console.log({
      [filter]: { gt: value[0], lt: value[1] },
      // range: [value[0], parseFloat(e.target.value)],
      // min: value[0],
    });
  };

  return (
    <>
      <div className='range-number-inputs'>
        <input
          type='number'
          placeholder='Min'
          value={value[0]}
          onChange={handleChangeMinValue}
        />
        <small> -</small>
        <input
          type='number'
          placeholder='Max'
          value={value[1]}
          onChange={handleChangeMaxValue}
        />
      </div>
      <div className='btn-range'>
        <DarkPrimaryButton
          onClick={value[0] !== '' && value[1] !== '' ? onApply : null}
        >
          Apply
        </DarkPrimaryButton>
      </div>
    </>
  );
};

export default RangeFilters;
