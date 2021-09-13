import React from 'react';

import CollectionAssetsFilters from '../../molecules/CollectionAssetsFilters';
import CollectionAssetsSort from '../../molecules/CollectionAssetsSort';
import CollectionAssetsPagination from '../../molecules/CollectionAssetsPagination';

import CollectionAssetCard from '../../molecules/CollectionAssetCard';

const CollectionAssets = ({ collection, location }) => {
  return (
    <div className='collection-assets-container'>
      <CollectionAssetsFilters />
      <div className='collection-assets'>
        <div className='assets-header'>
          <CollectionAssetsSort />
          <CollectionAssetsPagination />
        </div>
        <div className='assets-container'>
          {!collection.assets ? (
            <div className='loader-assets'>
              <div className='spinner-border'></div>
            </div>
          ) : (
            <>
              {collection.assets.map((asset, i) => (
                <CollectionAssetCard
                  className='asset'
                  asset={asset}
                  key={asset.tokenId}
                  location={location}
                  idx={i}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionAssets;
