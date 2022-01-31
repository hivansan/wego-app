import React, { useState, useEffect } from 'react';
import DarkPrimaryButton from '../../atoms/darkPrimaryButton';

const RangeFilters = ({ filter, max, range, setRange, price }) => {
  const [value, setValue] = useState([1, '']);

  const handleChangeMinValue = (e) => {
    setValue([e.target.value, value[1]]);
  };

  const handleChangeMaxValue = (e) => {
    setValue([value[0], e.target.value]);
  };

  const onApply = () => {
    setRange({
      param: price || filter,
      range: { gte: +value[0], lte: +value[1] },
    });
  };

  useEffect(() => {
    if (max) {
      setValue([1, max || '']);
    }
  }, [max]);

  useEffect(() => {
    if (!range) {
      setValue([1, max || '']);
    }
  }, [range]);


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
