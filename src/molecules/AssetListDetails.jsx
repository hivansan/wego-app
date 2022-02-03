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

  filtersMobileOpen,
  setFiltersMobileOpen,
  setAssetsSort,
  assetsSort,
  sortDirection,
  sortBy,
  setPriceRange,
  priceRange,
  rankRange,
  totalAssets,
  setRankRange,
  search
}) => {
  const [isFiltersCollapse, setIsFiltersCollapse] = useState(true);
  return (
    <div className='collection-assets-container'>
      <CollectionAssetsFilters
        setPriceRange={setPriceRange}
        priceRange={priceRange}
        rankRange={rankRange}
        setRankRange={setRankRange}
        search={search}
        filtersMobileOpen={filtersMobileOpen}
        setFiltersMobileOpen={setFiltersMobileOpen}

        isCollapse={isFiltersCollapse}
        setCollapse={setIsFiltersCollapse}
      />

      <div className='collection-assets'>
        <div className='assets-header'>
          <CollectionAssetsSort
            setAssetsSort={setAssetsSort}
            assetsSort={assetsSort}
          />
        </div>

        <div className='total-results'>
          {totalAssets && totalAssets.meta && (
            <small>{totalAssets.meta.total.toLocaleString()} results</small>
          )}
        </div>

        <ClearFilters
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          rankRange={rankRange}
          setRankRange={setRankRange}
        />

        <div className='assets-container'>
          {assets ? (
            <InfiniteScroll
              dataLength={assets.length}
              next={() =>
                _loadNextPage(
                  sortBy,
                  sortDirection,
                  priceRange,
                  rankRange
                )
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