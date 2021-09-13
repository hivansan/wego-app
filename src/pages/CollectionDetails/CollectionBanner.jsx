import React from 'react';

const CollectionBanner = ({ banner }) => {
  return (
    <div className='collection-banner'>
      {!banner ? (
        <div className='banner-loader'></div>
      ) : (
        <img src={banner} alt='collection banner' />
      )}
    </div>
  );
};

export default CollectionBanner;
