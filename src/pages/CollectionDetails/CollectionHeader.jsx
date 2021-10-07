import React from 'react';
import CollectionBanner from './CollectionBanner';
import CollectionHeaderLeft from './CollectionHeaderLeft';
import CollectionHeaderRight from './CollectionHeaderRight';

const CollectionHeader = ({ collection, isFiltersMobileOpen }) => {
  return (
    <div className={`${isFiltersMobileOpen} collection-header`}>
      <div className='collection-header-info'>
        <CollectionHeaderLeft collectionInfo={collection} />
        <CollectionHeaderRight collectionInfo={collection} />
      </div>
    </div>
  );
};

export default CollectionHeader;
