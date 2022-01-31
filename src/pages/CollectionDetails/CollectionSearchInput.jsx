import React, { forwardRef } from 'react';
import { BiSearch } from 'react-icons/bi';

const CollectionSearchInput = forwardRef((props, ref) => {
  const searchAssetHandler = (e) => {
    props.onChange(e.target.value);
    if (props.setDebounceParam) {
      props.setDebounceParam(e.target.value);
    }
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
          ref={ref}
        />
      </div>

    </div>
  );
});

export default CollectionSearchInput;
