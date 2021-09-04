import React from 'react';
import CollectionBanner from './CollectionBanner';
import CollectionHeaderLeft from './CollectionHeaderLeft';
import CollectionHeaderRight from './CollectionHeaderRight';

const CollectionHeader = ({ collectionInfo }) => {
  return (
    <div className='collection-header'>
      <CollectionBanner banner={collectionInfo.banner} />
      <div className='collection-header-info'>
        <CollectionHeaderLeft collectionInfo={collectionInfo} />
        <CollectionHeaderRight collectionInfo={collectionInfo} />
      </div>
    </div>
  );
};

export default CollectionHeader;
