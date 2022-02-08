import React, { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { HiFilter } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { setStoreFilter } from '../../store/actions/actionFilters';
import { useStoreFilter } from '../../store/selectors/useFilters';
import filtersState from '../../store/states/filtersState';

const Trait = ({ filters, setFilters, trait, bgFilters }) => {
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  // Save the account to redux
  const dispatch = useDispatch();
  const _setFilters = React.useCallback(
    storeFilter => dispatch(setStoreFilter(storeFilter)),
    [dispatch]
  );
  const _storeFilter = useStoreFilter();
  const { ...storeFilter } = _storeFilter.storeFilter;

  const handleFilter = () => {

    if (!filters || !setFilters)
      return;

    if (checked) {
      let newFilters = filters.filter(f => f.value !== trait.value || f.traitType !== trait.trait_type);
      setFilters(newFilters);
      _setFilters(newFilters);
      return setChecked(false);
    }
    setFilters(() => {
      // const obj = {};
      setFilters([
        ...filters,
        {
          traitType: trait.trait_type,
          value: trait.value,
        },
      ]);
    });
    _setFilters([...filters,
    {
      traitType: trait.trait_type,
      value: trait.value
    }])
    setChecked(true);
    setVisible(true);
  };

  const handleFilterIcon = () => {
    if (checked) {
      return setVisible(true);
    } else {
      return setVisible(!visible)
    }
  };

  useEffect(() => {
    if (
      bgFilters.some((el) => el.value === trait.value) &&
      bgFilters.some((el) => el.traitType === trait.trait_type)
    ) {
      setChecked(true);
      setVisible(true);
    }
  }, []);

  return (
    <div className='asset-detail-modal-stats-filter' onClick={handleFilter} onMouseOver={handleFilterIcon} onMouseOut={handleFilterIcon}>
      <div className='asset-detail-filter-header'>
        <small>{trait.trait_type}</small>
        <div className='asset-detail-filter-header-n'>
          {trait.traitScore && (
            <small>+{trait.traitScore.toString()?.substr(0, 6)}</small>
          )}
        </div>
      </div>
      <div
        className={`${checked ? 'checked' : 'unChecked'} asset-detail-filter-attribute`}
      >
        <small>
          {trait.value != null ? trait.value : "None"}
        </small>
        {visible && (<span className='asset-detail-filter-icon'><HiFilter size={14} /></span>)}
        <div className='asset-detail-filter-a'>
          <p>{trait.trait_count}</p>
        </div>
      </div>
      <div className='traits-prices'>
        {trait && (
          <small>
            {trait.top_price && (<span>Top <FaEthereum size={10} className='token token-secondary' />{trait.top_price} </span>)}
            {trait.top_price && (<span>Floor <FaEthereum size={10} className='token token-secondary' /> {trait.floor_price} </span>)}
          </small>
        )}
      </div>
    </div>
  );
};

export default Trait;
