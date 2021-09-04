import React from 'react';

const CollectionBanner = ({ banner }) => {
  return (
    <div className='collection-banner'>
      <img src={banner} alt='collection banner' />
    </div>
  );
};

export default CollectionBanner;
