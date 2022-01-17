import { useEffect, useState } from 'react';
import Icon from 'react-crypto-icons';

const Trait = ({ filters, setFilters, trait, bgFilters, collectionTraits }) => {
  const [checked, setChecked] = useState(false);
  const handleFilter = () => {
    if (checked) {
      setFilters(() => filters.filter(({ value }) => value !== trait.value));
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

    setChecked(true);
  };

  useEffect(() => {
    if (
      bgFilters.some((el) => el.value === trait.value) &&
      bgFilters.some((el) => el.traitType === trait.trait_type)
    ) {
      setChecked(true);
    }
  }, []);

  return (
    <div className='asset-detail-modal-stats-filter' onClick={handleFilter}>
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
        <small>{trait.value}</small>
        <div className='asset-detail-filter-a'>
          <p>{trait.trait_count}</p>
        </div>
      </div>
      <div className='traits-prices'>
        {collectionTraits && (
          <small>
            <span>Top: <Icon name='eth' size='14' className='token token-secondary' /> {collectionTraits.top_price} </span>
            <span>Floor: <Icon name='eth' size='14' className='token token-secondary' /> {collectionTraits.floor_price} </span>
          </small>
        )}
      </div>
    </div>
  );
};

export default Trait;
