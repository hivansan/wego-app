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
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
          <CollectionAssetCard className='asset' />
        </div>
      </div>
    </div>
  );
};

export default CollectionAssets;
