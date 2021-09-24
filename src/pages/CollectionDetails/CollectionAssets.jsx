import React, { useState } from 'react';

import CollectionAssetsFilters from '../../molecules/CollectionsAssetsFilters/Index';
import CollectionAssetsSort from '../../molecules/CollectionAssetsSort';
import InfiniteScroll from 'react-infinite-scroll-component';
import CollectionAssetCard from '../../molecules/CollectionAssetCard';

const CollectionAssets = ({
  collection,
  location,
  assets,
  fetchMoreAssets,
  noMoreAssets,
}) => {
  const [isFiltersCollapse, setIsFiltersCollapse] = useState(true);

  return (
    <div className='collection-assets-container'>
      <CollectionAssetsFilters
        isCollapse={isFiltersCollapse}
        setCollapse={setIsFiltersCollapse}
      />
      <div className='collection-assets'>
        <div className='assets-header'>
          <CollectionAssetsSort />
        </div>
        <div className='assets-container'>
          {assets && (
            <InfiniteScroll
              dataLength={assets.length}
              next={fetchMoreAssets}
              hasMore={noMoreAssets}
              className='assets-container-infinite'
              loader={<div style={{ height: '100px', width: '100%' }}></div>}
            >
              {assets.map((asset, i) => (
                <CollectionAssetCard
                  className='asset'
                  asset={asset}
                  key={asset.token_id}
                  location={location}
                  idx={i}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionAssets;
