import React, { useState } from 'react';

import CollectionAssetsFilters from '../../molecules/CollectionsAssetsFilters/CollectionAssetsFilters';
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
  collectionSlug,
  traits,
  setPriceRange,
  priceRange,
  rankRange,
  totalAssets,
  setRankRange,
  setTraitsCountRange,
  traitsCountRange,
  setBuyNow,
  buyNow,
}) => {
  const [isFiltersCollapse, setIsFiltersCollapse] = useState(true);

  return (
    <div className='collection-assets-container'>
      <CollectionAssetsFiltersMobile
        containerClassName='modal-filters'
        setTraitsCountRange={setTraitsCountRange}
        traitsCountRange={traitsCountRange}
        isOpen={filtersMobileOpen}
        setBuyNow={setBuyNow}
        buyNow={buyNow}
        setIsOpen={setFiltersMobileOpen}
        collectionTraits={collectionTraits}
        setFilters={setFilters}
        filters={filters}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
        rankRange={rankRange}
        setRankRange={setRankRange}
        collectionSlug={collectionSlug}
      />
      <CollectionAssetsFilters
        setPriceRange={setPriceRange}
        setBuyNow={setBuyNow}
        buyNow={buyNow}
        setTraitsCountRange={setTraitsCountRange}
        traitsCountRange={traitsCountRange}
        priceRange={priceRange}
        rankRange={rankRange}
        setRankRange={setRankRange}
        collectionSlug={collectionSlug}
        collection={collection}
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

        <div className='total-results'>
          {totalAssets && totalAssets.meta && (
            <small>{totalAssets.meta.total.toLocaleString()} results</small>
          )}
        </div>

        <div className='assets-actual-filters'>
          {priceRange && (
            <div className='trait-filter' onClick={() => setPriceRange(false)}>
              {priceRange.param === 'priceUsdRange' ? 'USD: ' : 'ETH: '}
              {priceRange.range.gte} - {priceRange.range.lte}
              <GrFormClose />
            </div>
          )}
          {rankRange && (
            <div className='trait-filter' onClick={() => setRankRange(false)}>
              Rarity Rank: {rankRange.range.gte} - {rankRange.range.lte}
              <GrFormClose />
            </div>
          )}
          {traitsCountRange && (
            <div
              className='trait-filter'
              onClick={() => setTraitsCountRange(false)}
            >
              Traits count: {traitsCountRange.range.gte} -{' '}
              {traitsCountRange.range.lte}
              <GrFormClose />
            </div>
          )}
          {buyNow && (
            <div className='trait-filter' onClick={() => setBuyNow(false)}>
              Buy Now
              <GrFormClose />
            </div>
          )}
          {filters && filters.length > 0 && (
            <>
              {filters.map(({ traitType, value: filter }, i) => (
                <div
                  className='trait-filter'
                  key={i}
                  onClick={() =>
                    setFilters(() =>
                      filters.filter(trait => trait.value !== filter || trait.traitType !== traitType)
                    )
                  }
                >
                  {traitType}: {filter}
                  <GrFormClose />
                </div>
              ))}
            </>
          )}
          {filters.length > 0 ||
            priceRange ||
            rankRange ||
            traitsCountRange ||
            buyNow ? (
            <div
              className='clear-filters'
              onClick={() => {
                setFilters([]);
                setPriceRange(false);
                setRankRange(false);
                setBuyNow(false);
              }}
            >
              Clear All
            </div>
          ) : null}
        </div>

        <div className={` assets-container`}>
          {assets ? (
            <InfiniteScroll
              dataLength={assets.length}
              next={() =>
                _loadNextPage(
                  sortBy,
                  sortDirection,
                  traits,
                  priceRange,
                  rankRange,
                  traitsCountRange,
                  buyNow
                )
              }
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
                                      collectionImg={collection.imgMain}
                                      index={i}
                                      asset={assets}
                                      isScrolling={isScrolling}
                                      location={location}
                                      setFilters={setFilters}
                                      filters={filters}
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
        Filters {filters && filters.length}{' '}
        {filtersMobileOpen && <GrFormClose />}
      </div>
    </div>
  );
};

export default CollectionAssets;
