import { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';

const Trait = ({ filters, setFilters, trait, bgFilters }) => {
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
        <small>{trait.value != null ? trait.value : "None"}</small>
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
