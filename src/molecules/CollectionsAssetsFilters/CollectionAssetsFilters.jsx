import { useState, useEffect } from 'react';

import { HiFilter } from 'react-icons/hi';
import { BiArrowToLeft } from 'react-icons/bi';
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
}) => {
  const setIsCollapse = () => setCollapse(!isCollapse);
  const [maxPrice, setMaxPrice] = useState(null);
  const [maxRank, setMaxRank] = useState(null);
  const [maxTraitsCount, setMaxTraitsCount] = useState(null);
  const [price, setPrice] = useState('priceUsdRange');
  const traits = [];
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
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
    const priceSelected =
      price === 'priceUsdRange' ? 'currentPriceUSD' : 'currentPrice';

    const res = await api.assets.find(
      collectionSlug,
      1,
      0,
      priceSelected,
      'desc'
    );

    setMaxPrice(res?.results[0]?.[priceSelected] || null);
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
  const getMaxTraitsCount = async () => {
    const res = await api.assets.find(
      collectionSlug,
      1,
      0,
      'traitsCount',
      'desc'
    );
    setMaxTraitsCount(res?.results[0]?.traitsCount);
  };

  useEffect(() => {
    getMaxRariRank();
    getMaxTraitsCount();
  }, []);

  useEffect(() => {
    getMaxPrice();
  }, [price]);

  return (
    <>
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
      />

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

          <Filter title='Status' isCollapse={isCollapse}>
            <div className='filter-status'>
              <LightPrimaryButton
                className={`${buyNow ? 'selected' : 'unselected'}`}
                onClick={
                  buyNow ? () => setBuyNow(false) : () => setBuyNow({ gte: 1 })
                }
              >
                Buy now
              </LightPrimaryButton>
              {/* <LightPrimaryButton>Auction</LightPrimaryButton> */}
            </div>
          </Filter>

          {/* price filter */}
          <Filter title='Price' isCollapse={isCollapse}>
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
          <Filter title='Traits Count' isCollapse={isCollapse}>
            <RangeFilters
              filter='traitsCountRange'
              setRange={setTraitsCountRange}
              range={traitsCountRange}
              max={maxTraitsCount}
              min={0}
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
