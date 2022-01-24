import React, { forwardRef, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const CollectionSearchInput = ({
  setSearchAsset
}) => {

  const searchAssetHandler = (e) => {
    setSearchAsset(e.target.value);
  };

  return (
    <div
      className='asset-search-input'
    >
      <div className='input'>
        <BiSearch />
        <input
          type='text'
          placeholder='Search Assets'
          onChange={searchAssetHandler}
        />
      </div>

    </div>
  );
};

export default CollectionSearchInput;
