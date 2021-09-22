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
  offset,
  getCollectionAssets,
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
          {!assets.length === 0 ? (
            <div className='loader-assets'>
              <div className='spinner-border'></div>
            </div>
          ) : (
            <>
              <InfiniteScroll
                dataLength={assets.length}
                next={fetchMoreAssets}
                className='assets-container-infinite'
                hasMore={noMoreAssets}
              >
                {assets.map((asset, i) => (
                  <CollectionAssetCard
                    className='asset'
                    asset={asset}
                    key={i}
                    location={location}
                    idx={i}
                  />
                ))}
              </InfiniteScroll>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionAssets;
