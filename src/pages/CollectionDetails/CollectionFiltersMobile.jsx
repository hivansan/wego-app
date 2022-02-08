import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosClose } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Filter from '../../molecules/CollectionsAssetsFilters/Filter';
import SearchFilters from '../../molecules/CollectionsAssetsFilters/SearchFilters';
import RangeFilters from '../../molecules/CollectionsAssetsFilters/RangeFilters';
import { Api } from '../../services/api';

const CollectionAssetsFiltersMobile = ({
  address,
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
  setTraitsCountRange,
  traitsCountRange,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [maxPrice, setMaxPrice] = useState(null);
  const [maxRank, setMaxRank] = useState(null);
  const [maxTraitsCount, setMaxTraitsCount] = useState(null);
  const [price, setPrice] = useState('priceUsdRange');
  const api = new Api();
  const traitTypes = [];

  if (collectionTraits) {
    const myObj = {};
    collectionTraits.forEach((el) => {
      if (!(el.trait_type in myObj)) {
        myObj[el.trait_type] = true;
        traitTypes.push(el.trait_type);
      }
    });
  }

  const getMaxPrice = async () => {
    const priceSelected =
      price === 'priceUsdRange' ? 'currentPriceUSD' : 'currentPrice';

    var source = {}
    if (collectionSlug) 
      source.slug = collectionSlug
    else if (address)
      source.ownerAddress = address


    const res = await api.assets.find({
      ...source,
      limit: 1,
      offset: 0,
      sortBy: priceSelected,
      sortDirection: 'desc'
    });

    setMaxPrice(res?.results[0]?.[priceSelected] || null);
  };

  const getMaxRariRank = async () => {

    var source = {}
    if (collectionSlug) 
      source.slug = collectionSlug
    else if (address)
      source.ownerAddress = address

    const res = await api.assets.find({
      ...source,
      limit: 1,
      offset: 0,
      sortBy: 'rarityScoreRank',
      sortDirection: 'desc'
    });
    setMaxRank(res?.results[0]?.rarityScoreRank);
  };
  const getMaxTraitsCount = async () => {

    var source = {}
    if (collectionSlug) 
      source.slug = collectionSlug
    else if (address)
      source.ownerAddress = address

    const res = await api.assets.find({
      ...source,
      limit: 1,
      offset: 0,
      sortBy: 'traitsCount',
      sortDirection: 'desc'
    });
    setMaxTraitsCount(res?.results[0]?.traitsCount);
  };

  useEffect(() => {
    getMaxRariRank();
    getMaxTraitsCount();
  }, []);

  useEffect(() => {
    getMaxPrice();
  }, [price]);

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
        <Filter title='Price'>
          <RangeFilters
            filter='price'
            setRange={setPriceRange}
            range={priceRange}
            max={maxPrice}
            setPrice={setPrice}
            price={price}
            min={1}
          />
        </Filter>

        {/* rank filter */}
        <Filter title='Rarity Rank'>
          <RangeFilters
            filter='rankRange'
            min={1}
            range={rankRange}
            setRange={setRankRange}
            max={maxRank}
          />
        </Filter>
        {traitsCountRange && setTraitsCountRange && (
          <Filter title='Traits Count'>
            <RangeFilters
              filter='traitsCountRange'
              setRange={setTraitsCountRange}
              range={traitsCountRange}
              max={maxTraitsCount}
              min={0}
            />
          </Filter>  
        )}
        {collectionTraits && traitTypes?
          traitTypes.map((traitType, i) => (
            <Filter title={traitType} key={i} counter={collectionTraits.filter(trait => trait.trait_type === traitType).length}>
              <SearchFilters
                collectionTraits={collectionTraits}
                traitType={traitType}
                setFilters={setFilters}
                filters={filters}
              />
            </Filter>
          )) : <div className='filter-spinner'><FaSpinner size={60} className='spinner' /></div>}
      </DialogContent>
    </Dialog>
  );
};

export default CollectionAssetsFiltersMobile;
