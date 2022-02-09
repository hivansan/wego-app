import React from 'react';
import CollectionBanner from './CollectionBanner';
import CollectionHeaderLeft from './CollectionHeaderLeft';
import CollectionHeaderRight from './CollectionHeaderRight';

const CollectionHeader = ({ collection, isFiltersMobileOpen, setIsFavorite, isFavorite, isFavoriteLoading }) => {
  return (
    <div className={`${isFiltersMobileOpen} collection-header`}>
      <div className='collection-header-info'>
        <CollectionHeaderLeft 
          collectionInfo={collection} 
          isFavorite={isFavorite} 
          setIsFavorite={setIsFavorite} 
          isFavoriteLoading={isFavoriteLoading}
        />
        <CollectionHeaderRight collectionInfo={collection} />
      </div>
    </div>
  );
};

export default CollectionHeader;
