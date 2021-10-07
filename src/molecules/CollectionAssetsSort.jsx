import React, { useState, useEffect } from 'react';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

const CollectionAssetsSort = ({ setAssetsSort, assetsSort }) => {
  const [select, setSelect] = useState('none');
  const [radio, setRadio] = useState('desc');

  const handleOnChange = (e) => {
    setSelect(e.target.value);
  };
  const handleRadioChange = (event) => {
    setRadio(event.target.value);
  };

  useEffect(() => {
    setAssetsSort({
      orderBy: select,
      orderDirection: radio,
    });
  }, [select, radio]);

  return (
    <div className='assets-sort'>
      <p>Sort by:</p>
      <div className='sort-elements'>
        <select onChange={handleOnChange}>
          <option value='none' defaultValue>
            None
          </option>
          <option value='sale_date'>Sale Date</option>
          <option value='sale_count'>Sale Count</option>
          <option value='sale_price'>Sale date</option>
          <option value='token_id'>Token ID</option>
        </select>

        <RadioGroup
          row
          name='row-radio-buttons-group'
          defaultValue='desc'
          value={radio}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            style={{ color: '#666666' }}
            value='desc'
            control={<Radio color='default' style={{ color: '#1f71ba' }} />}
            label='Descending'
          />
          <FormControlLabel
            style={{ color: '#666666' }}
            value='asc'
            control={<Radio style={{ color: '#1f71ba' }} />}
            label='Ascending'
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export default CollectionAssetsSort;
