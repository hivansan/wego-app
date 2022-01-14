import React, { useState, useEffect } from 'react';
import DarkPrimaryButton from '../../atoms/darkPrimaryButton';

const RangeFilters = ({ filter, max, range, setRange, price, setPrice }) => {
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

  const onSelectPriceHandler = (e) => {
    setPrice(e.target.value);
  };

  // console.log(price);
  return (
    <>
      {filter === 'price' && (
        <div className='range-select-container'>
          <select onChange={onSelectPriceHandler} className='range-select'>
            {/* <option value='sale_date'>Sale Date</option>
          <option value='sale_count'>Sale Count</option> */}
            <option value='priceRangeUSD' defaultValue>
              USD
            </option>
            <option value='priceRange'>ETH</option>
          </select>
        </div>
      )}
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
