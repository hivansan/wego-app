import React, { useState, useEffect } from 'react';

import CollectionAssetsFilters from '../../molecules/CollectionsAssetsFilters/Index';
import CollectionAssetsSort from '../../molecules/CollectionAssetsSort';
import InfiniteScroll from 'react-infinite-scroll-component';
import CollectionAssetCard from '../../molecules/CollectionAssetCard';
import CollectionAssetsFiltersMobile from './CollectionFiltersMobile';
import { GrFormClose } from 'react-icons/gr';
import { WindowScroller, List, AutoSizer } from 'react-virtualized';
import Skeleton from 'react-loading-skeleton';

const CollectionAssets = ({
  collection,
  location,
  assets,
  _loadNextPage,
  hasNextPage,
  setCollectionTraits,
  collectionTraits,
  setFilters,
  filters,
  filtersMobileOpen,
  setFiltersMobileOpen,
  setAssetsSort,
  assetsSort,
  sortDirection,
  sortBy,
  traits,
}) => {
  const [isFiltersCollapse, setIsFiltersCollapse] = useState(true);

  return (
    <div className='collection-assets-container'>
      <CollectionAssetsFiltersMobile
        containerClassName='modal-filters'
        isOpen={filtersMobileOpen}
        setIsOpen={setFiltersMobileOpen}
        collectionTraits={collectionTraits}
        setFilters={setFilters}
        filters={filters}
      />
      <CollectionAssetsFilters
        filtersMobileOpen={filtersMobileOpen}
        collectionTraits={collectionTraits}
        setCollectionTraits={setCollectionTraits}
        isCollapse={isFiltersCollapse}
        setCollapse={setIsFiltersCollapse}
        setFilters={setFilters}
        filters={filters}
      />
      <div className='collection-assets'>
        <div className='assets-header'>
          <CollectionAssetsSort
            setAssetsSort={setAssetsSort}
            assetsSort={assetsSort}
          />
        </div>
        {filters.length > 0 && (
          <div className='assets-actual-filters'>
            {filters.map(({ traitType, value: filter }, i) => (
              <div
                className='trait-filter'
                key={i}
                onClick={() =>
                  setFilters(() =>
                    filters.filter(({ value }) => value !== filter)
                  )
                }
              >
                {traitType}: {filter}
                <GrFormClose />
              </div>
            ))}
            <div className='clear-filters' onClick={() => setFilters([])}>
              Clear All
            </div>
          </div>
        )}
        <div className={` assets-container`}>
          {assets ? (
            <InfiniteScroll
              dataLength={assets.length}
              next={() => _loadNextPage(sortBy, sortDirection, traits)}
              hasMore={true}
              className={` assets-container-infinite`}
              loader={<div style={{ height: '100px', width: '100%' }}></div>}
            >
              <AutoSizer className='auto'>
                {({ width }) => {
                  const ITEMS_COUNT = hasNextPage
                    ? assets.length + 10
                    : assets.length;
                  const isItemLoaded = (index) => !!assets[index];
                  const ITEM_SIZE = 310;
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
                                      collectionImg={collection.imgMain}
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

                    // </InfiniteLoader>
                  );
                }}
              </AutoSizer>
            </InfiniteScroll>
          ) : (
            <div className='no-assets'>No items to display</div>
          )}
        </div>
      </div>
      <div
        className='filters-mobile'
        onClick={() => setFiltersMobileOpen(!filtersMobileOpen)}
      >
        Filters {filters.length} {filtersMobileOpen && <GrFormClose />}
      </div>
    </div>
  );
};

export default CollectionAssets;
