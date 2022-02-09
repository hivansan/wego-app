import { useState, useEffect } from 'react';

import { HiFilter } from 'react-icons/hi';
import { BiArrowToLeft } from 'react-icons/bi';
import { FaSpinner } from 'react-icons/fa';
import Filter from './Filter';
import SearchFilters from './SearchFilters';
import RangeFilters from './RangeFilters';
import { useMediaQuery } from 'react-responsive';
import { Api } from '../../services/api';
import CollectionFiltersMobile from '../../pages/CollectionDetails/CollectionFiltersMobile';
// import DarkPrimaryButton from '../../atoms/darkPrimaryButton';
import LightPrimaryButton from '../../atoms/lightPrimaryButton';

// 657

const CollectionAssetsFilters = ({
  isCollapse,
  setCollapse,
  collectionTraits,
  setFilters,
  filters,
  collectionSlug,
  collection,
  filtersMobileOpen,
  setFiltersMobileOpen,
  setPriceRange,
  priceRange,
  rankRange,
  setRankRange,
  setTraitsCountRange,
  traitsCountRange,
  setBuyNow,
  buyNow,
  address
}) => {
  const setIsCollapse = () => setCollapse(!isCollapse);
  const [maxPrice, setMaxPrice] = useState(null);
  const [maxRank, setMaxRank] = useState(null);
  const [maxTraitsCount, setMaxTraitsCount] = useState(null);
  const [price, setPrice] = useState('priceRange'); // ETH price range
  const traits = [];
  const isMobile = useMediaQuery({ query: '(max-width: 657px)' });
  const api = new Api();

  if (collectionTraits) {
    const traitType = {};
    collectionTraits.forEach((el) => {
      if (!(el.trait_type in traitType)) {
        traitType[el.trait_type] = true;
        traits.push(el.trait_type);
      }
    });
  }

  const getMaxPrice = async () => {
    //Dollar filter is commented, this is unnecesary. Remove if the filter isn't comming back
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

  if (isMobile) {
    return (
      <CollectionFiltersMobile
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
        address={address}
      />
    );
  }

  return (
    <>
      <div
        className={`${isCollapse ? 'd-block' : 'd-none'
          } filter-collapse collection-assets-filters`}
      >
        <header onClick={setIsCollapse}>
          <HiFilter size={20} />
        </header>
      </div>

      <div
        className={`${isCollapse ? 'd-none' : 'd-block'
          } collection-assets-filters`}
      >
        <div>
          <header onClick={setIsCollapse}>
            <div className='header-collapsed-off'>
              <div className='header-action-collapse'>Filter</div>
            </div>
            <BiArrowToLeft size={20} />
          </header>

          {buyNow && (
            <Filter title='Status' isCollapse={isCollapse}>
            <div className='filter-status'>
              <LightPrimaryButton
                className={`${buyNow ? 'selected' : 'unselected'}`}
                onClick={
                  buyNow ? () => setBuyNow(false) : () => setBuyNow(true)
                }
              >
                Buy now
              </LightPrimaryButton>
              {/* <LightPrimaryButton>Auction</LightPrimaryButton> */}
            </div>
          </Filter>
          )}
          

          {/* price filter */}
          <Filter title='Price ETH' isCollapse={isCollapse}>
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
          <Filter title='Rarity Rank' isCollapse={isCollapse}>
            <RangeFilters
              filter='rankRange'
              min={1}
              range={rankRange}
              setRange={setRankRange}
              max={maxRank}
            />
          </Filter>
          {
            traitsCountRange && setTraitsCountRange && (
            <Filter title='Traits Count' isCollapse={isCollapse}>
              <RangeFilters
                filter='traitsCountRange'
                setRange={setTraitsCountRange}
                range={traitsCountRange}
                max={maxTraitsCount}
                min={0}
              />
            </Filter>  
            )}

          {/* traits filters */}
          {collectionTraits && filters && setFilters ?
            traits.map((traitType) => (
              <Filter title={traitType} key={traitType} counter={collectionTraits.filter(trait => trait.trait_type === traitType).length} isCollapse={isCollapse}>
                <SearchFilters
                  collectionTraits={collectionTraits}
                  traitType={traitType}
                  setFilters={setFilters}
                  filters={filters}
                  key={traitType}
                />
              </Filter>
            )) : collectionSlug?<div className='filter-spinner'><FaSpinner size={60} className='spinner' /></div> : ''}
        </div>
      </div>
    </>
  );
};

export default CollectionAssetsFilters;
