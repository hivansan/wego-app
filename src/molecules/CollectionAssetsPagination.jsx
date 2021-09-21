import React from 'react';

import DarkPrimaryButton from '../atoms/darkPrimaryButton';

const CollectionAssetsPagination = ({ offset }) => {
  return (
    <div className='assets-pagination'>
      <p>Page</p>
      <input type='text' placeholder={offset} />
      <small>of 350</small>
      <DarkPrimaryButton>Next {'>'}</DarkPrimaryButton>
    </div>
  );
};

export default CollectionAssetsPagination;
