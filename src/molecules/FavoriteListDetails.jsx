import React, { useState } from 'react';

import CollectionAssetsFilters from './CollectionsAssetsFilters/CollectionAssetsFilters';
import CollectionAssetsSort from './CollectionAssetsSort';
import InfiniteScroll from 'react-infinite-scroll-component';
import CollectionAssetCard from './CollectionAssetCard';
import { GrFormClose } from 'react-icons/gr';
import { WindowScroller, List, AutoSizer } from 'react-virtualized';
import Skeleton from 'react-loading-skeleton';
import ClearFilters from './CollectionsAssetsFilters/ClearFilters';

const AssetListDetails = ({
  location,
  assets,
  _loadNextPage,
  hasNextPage,
  isNextPageLoading,
  setAssets,
  totalAssets,
  favoriteAssets,
  setFavoriteAssets,
  favoriteAssetsLoading
}) => {

  return (
    <div className='collection-assets-container'>


      <div className='collection-assets'>

        <div className='assets-container'>
          {assets ? (
            <InfiniteScroll
              dataLength={assets.length}
              next={() =>
                _loadNextPage()
              }
              hasMore={true}
              className={` assets-container-infinite`}
              loader={<div style={{ height: '100px', width: '100%' }}></div>}
            >
              {/* VIRTUALIZATION */}
              <AutoSizer className='auto'>
                {({ width }) => {
                  const ITEMS_COUNT = hasNextPage
                    ? assets.length + 10
                    : assets.length;
                  const isItemLoaded = (index) => !!assets[index];
                  const ITEM_SIZE = 350;
                  const itemsPerRow = Math.floor(width / ITEM_SIZE) || 1;
                  const rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow);
                  return (
                    <WindowScroller>
                      {({ isScrolling, scrollTop, height }) => (
                        <List
                          autoHeight
                          scrollTop={scrollTop}
                          className='List'
                          width={width}
                          height={height}
                          rowCount={rowCount}
                          rowHeight={ITEM_SIZE}
                          isScrolling={isScrolling}
                          rowRenderer={({ index, key, style }) => {
                            const items = [];
                            const fromIndex = index * itemsPerRow;
                            const toIndex = Math.min(
                              fromIndex + itemsPerRow,
                              ITEMS_COUNT
                            );

                            for (let i = fromIndex; i < toIndex; i++) {
                              items.push(
                                <React.Fragment key={i}>
                                  {!isItemLoaded(i) ? (
                                    <div className='loading-item'>
                                      <Skeleton className='loading-item-header' />
                                      <Skeleton className='loading-item-image' />
                                      <Skeleton className='loading-item-token' />
                                    </div>
                                  ) : (
                                    <CollectionAssetCard
                                      index={i}
                                      asset={assets}
                                      isScrolling={isScrolling}
                                      location={location}
                                      favoriteAssets={favoriteAssets}
                                      setFavoriteAssets={setFavoriteAssets}
                                      favoriteAssetsLoading={favoriteAssetsLoading}
                                    />
                                  )}
                                </React.Fragment>
                              );
                            }

                            return (
                              <div className='Row' key={key} style={style}>
                                {items}
                              </div>
                            );
                          }}
                        />
                      )}
                    </WindowScroller>
                  );
                }}
              </AutoSizer>
            </InfiniteScroll>
          ) : (
            <div className='no-assets'>No items to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetListDetails;