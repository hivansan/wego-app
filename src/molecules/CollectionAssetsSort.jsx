import React, { useState, useEffect } from 'react';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

const CollectionAssetsSort = ({ setAssetsSort, assetsSort }) => {
  const [select, setSelect] = useState('rarityScoreRank');
  const [radio, setRadio] = useState('asc');

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
          {/* <option value='none'>None</option> */}
          {/* <option value='sale_date'>Sale Date</option>
          <option value='sale_count'>Sale Count</option> */}
          <option value='rarityScore'>Rarity Score</option>
          <option value='rarityScoreRank'>Rarity Score Rank</option>
          {/* <option value='traitsCount'>Traits Count</option> */}
          <option value='currentPrice'>Current Price</option>
          <option value='lastSalePrice'>Last Sale Price</option>
          <option value='lastSale.created_date'>Recently Sold</option>
        </select>

        <RadioGroup
          row
          name='row-radio-buttons-group'
          defaultValue='asc'
          value={radio}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            className='sort-direction'
            value='desc'
            control={<Radio color='default' style={{ color: '#1f71ba' }} />}
            label='Descending'
          />
          <FormControlLabel
            className='sort-direction'
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
