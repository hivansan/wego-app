import React from 'react'
import { GrFormClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { setStoreFilter } from '../../store/actions/actionFilters';

const ClearFilters = ({
  priceRange,
  setPriceRange,
  rankRange,
  setRankRange,
  traitsCountRange,
  setTraitsCountRange,
  buyNow,
  setBuyNow,
  filters,
  setFilters,
}) => {
  const dispatch = useDispatch();
  const _setFilters = React.useCallback(
    storeFilter => dispatch(setStoreFilter(storeFilter)),
    [dispatch]
  );

  return (
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
              onClick={() => {
                setFilters(() =>
                  filters.filter(f => f.value !== filter || f.traitType !== traitType)
                )
                _setFilters(filters.filter(f => f.value !== filter || f.traitType !== traitType))
              }
              }
            >
              {traitType}:{' '}
              {filter && filter.constructor == Object ? (
                Object.entries(filter).reduce((prev, curr) => prev && (curr[0] === 'gte' || curr[0] === 'lte'), true) ? (
                  <>
                    {filter.gte}-{filter.lte}
                  </>
                ) : ('')
              ) : (
                filter ? filter : 'None'
              )}
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
            _setFilters([]);
            setPriceRange(false);
            setRankRange(false);
            setBuyNow(false);
          }}
        >
          Clear All
        </div>
      ) : null}
    </div>
  );
};

export default ClearFilters;
