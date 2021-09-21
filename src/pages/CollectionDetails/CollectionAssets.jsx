import React from 'react';

import CollectionAssetsFilters from '../../molecules/CollectionAssetsFilters';
import CollectionAssetsSort from '../../molecules/CollectionAssetsSort';
import CollectionAssetsPagination from '../../molecules/CollectionAssetsPagination';

import InfiniteScroll from 'react-infinite-scroll-component';

import CollectionAssetCard from '../../molecules/CollectionAssetCard';

const CollectionAssets = ({
  collection,
  location,
  assets,
  fetchMoreAssets,
  noMoreAssets,
  offset,
}) => {
  return (
    <div className='collection-assets-container'>
      <CollectionAssetsFilters />
      <div className='collection-assets'>
        <div className='assets-header'>
          <CollectionAssetsSort />
          <CollectionAssetsPagination offset={offset} />
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
                className='assets-container'
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
