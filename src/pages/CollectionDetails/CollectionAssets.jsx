import React from 'react';

import CollectionAssetsFilters from '../../molecules/CollectionAssetsFilters';
import CollectionAssetsSort from '../../molecules/CollectionAssetsSort';
import CollectionAssetsPagination from '../../molecules/CollectionAssetsPagination';

import CollectionAssetCard from '../../molecules/CollectionAssetCard';

const CollectionAssets = () => {
  return (
    <div className='collection-assets-container'>
      <CollectionAssetsFilters />
      <div className='collection-assets'>
        <div className='assets-header'>
          <CollectionAssetsSort />
          <CollectionAssetsPagination />
        </div>
        <div className='assets-container'>
          <CollectionAssetCard />
          <CollectionAssetCard />
          <CollectionAssetCard />
          <CollectionAssetCard />
          <CollectionAssetCard />
          <CollectionAssetCard />
          <CollectionAssetCard />
          <CollectionAssetCard />
          <CollectionAssetCard />
        </div>
      </div>
    </div>
  );
};

export default CollectionAssets;
