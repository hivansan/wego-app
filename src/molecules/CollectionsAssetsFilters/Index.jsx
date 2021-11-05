import React, { useState, useEffect } from 'react';

import { HiFilter } from 'react-icons/hi';
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import Filter from './Filter';
import SearchFilters from './SearchFilters';
import RangeFilters from './RangeFilters';

import { Api } from '../../services/api';

const CollectionAssetsFilters = ({
  isCollapse,
  setCollapse,
  collectionTraits,
  setFilters,
  filters,
  collectionSlug,
  collection,
  setPriceRange,
  priceRange,
  rankRange,
  setRankRange,
}) => {
  const setIsCollapse = () => setCollapse(!isCollapse);
  const [maxPrice, setMaxPrice] = useState(null);
  const [maxRank, setMaxRank] = useState(null);
  const traits = [];

  const api = new Api();

  if (collectionTraits) {
    const myObj = {};
    collectionTraits.forEach((el) => {
      if (!(el.trait_type in myObj)) {
        myObj[el.trait_type] = true;
        traits.push(el.trait_type);
      }
    });
  }

  const getCollectionAsset = async () => {
    const res = await api.assets.find(
      collectionSlug,
      1,
      0,
      'currentPriceUSD',
      'desc'
    );
    setMaxPrice(res?.results[0]?.currentPriceUSD);
  };

  const getMaxRariRank = async () => {
    const res = await api.assets.find(
      collectionSlug,
      1,
      0,
      'rarityScoreRank',
      'desc'
    );
    setMaxRank(res?.results[0]?.rarityScoreRank);
  };

  useEffect(() => {
    getCollectionAsset();
    getMaxRariRank();
  }, []);

  return (
    <>
      <div
        className={`${
          isCollapse ? 'd-block' : 'd-none'
        } filter-collapse collection-assets-filters`}
      >
        <header onClick={setIsCollapse}>
          <HiFilter size={20} />
        </header>
      </div>

      <div
        className={`${
          isCollapse ? 'd-none' : 'd-block'
        } collection-assets-filters`}
      >
        <div>
          <header onClick={setIsCollapse}>
            <div className='header-collapsed-off'>
              <div className='header-action-collapse'>Filter</div>
            </div>
            <BiArrowToLeft size={20} />
          </header>

          {/* price filter */}
          <Filter title='Price usd' isCollapse={isCollapse}>
            <RangeFilters
              filter='priceRange'
              setRange={setPriceRange}
              range={priceRange}
              max={maxPrice}
              min={1}
            />
          </Filter>

          {/* rank filter */}
          <Filter title='Rarity Rank' isCollapse={isCollapse}>
            <RangeFilters
              filter='rarityScoreRankFilter'
              min={1}
              range={rankRange}
              setRange={setRankRange}
              max={maxRank}
            />
          </Filter>

          {/* traits filters */}
          {collectionTraits &&
            traits.map((traitType) => (
              <Filter title={traitType} key={traitType} isCollapse={isCollapse}>
                <SearchFilters
                  collectionTraits={collectionTraits}
                  traitType={traitType}
                  setFilters={setFilters}
                  filters={filters}
                  key={traitType}
                />
              </Filter>
            ))}
        </div>
      </div>
    </>
  );
};

export default CollectionAssetsFilters;
