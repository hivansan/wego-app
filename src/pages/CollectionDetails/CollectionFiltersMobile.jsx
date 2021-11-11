import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosClose } from 'react-icons/io';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Filter from '../../molecules/CollectionsAssetsFilters/Filter';
import SearchFilters from '../../molecules/CollectionsAssetsFilters/SearchFilters';
import RangeFilters from '../../molecules/CollectionsAssetsFilters/RangeFilters';
import { Api } from '../../services/api';

const CollectionAssetsFiltersMobile = ({
  collectionTraits,
  setFilters,
  filters,
  collectionSlug,
  collection,
  setPriceRange,
  priceRange,
  rankRange,
  setRankRange,
  isOpen,
  setIsOpen,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const newArr = [];
  const [maxPrice, setMaxPrice] = useState(null);
  const [maxRank, setMaxRank] = useState(null);
  const api = new Api();
  const myObj = {};

  if (collectionTraits) {
    collectionTraits.forEach((el) => {
      if (!(el.trait_type in myObj)) {
        myObj[el.trait_type] = true;
        newArr.push(el.trait_type);
      }
    });
  }

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

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <Dialog fullScreen={true} open={isOpen} keepMounted>
      <header
        onClick={() => setIsOpen(false)}
        className='collection-assets-filters-mobile-header'
      >
        <div>Filter</div>
        <IoIosClose />
      </header>
      <DialogContent className='collection-assets-filters-mobile'>
        {/* <Filter title='Status'></Filter>
      <Filter title='Price'></Filter> */}
        {/* price filter */}
        <Filter title='Price usd'>
          <RangeFilters
            filter='priceUsdRange'
            setRange={setPriceRange}
            range={priceRange}
            max={maxPrice}
            min={1}
          />
        </Filter>

        {/* rank filter */}
        <Filter title='Rarity Rank'>
          <RangeFilters
            filter='rarityScoreRankFilter'
            min={1}
            range={rankRange}
            setRange={setRankRange}
            max={maxRank}
          />
        </Filter>
        {newArr.map((traitType, i) => (
          <Filter title={traitType} key={i}>
            <SearchFilters
              collectionTraits={collectionTraits}
              traitType={traitType}
              setFilters={setFilters}
              filters={filters}
            />
          </Filter>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CollectionAssetsFiltersMobile;
