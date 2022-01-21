import React, { forwardRef, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const CollectionSearchInput = ({
  setSearchAsset,
  searchAsset
}) => {

  const searchAssetHandler = (e) => {
    setSearchAsset(e.target.value);
  };

  return (
    <div
      className='search-input'
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
