import React from 'react';

import DarkPrimaryButton from '../atoms/darkPrimaryButton';

const CollectionAssetsPagination = () => {
  return (
    <div className='assets-pagination'>
      <p>Page</p>
      <input type='text' placeholder='1' />
      <small>of 350</small>
      <DarkPrimaryButton>Next {'>'}</DarkPrimaryButton>
    </div>
  );
};

export default CollectionAssetsPagination;
