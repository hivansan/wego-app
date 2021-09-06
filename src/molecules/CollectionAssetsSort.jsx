import React from 'react';

const CollectionAssetsSort = ({ options }) => {
  return (
    <div className='assets-sort'>
      <p>Sort by:</p>
      <div className='sort-elements'>
        <select>
          <option value='rarity'>Rarity</option>
          <option value='rarity'>Rarity</option>
          <option value='rarity'>Rarity</option>
          <option value='rarity'>Rarity</option>
          <option value='rarity'>Rarity</option>
        </select>
        <input type='text' placeholder="ID's" />
        <input type='text' placeholder="ID's" />
      </div>
    </div>
  );
};

export default CollectionAssetsSort;
