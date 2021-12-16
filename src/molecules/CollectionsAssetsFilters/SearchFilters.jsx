import { useState, useEffect } from 'react';
import Checkbox from '../../atoms/Checkbox';

import Range from './Range';

const SearchFilters = ({
  traitType,
  collectionTraits,
  setFilters,
  filters,
}) => {
  const [param, setParam] = useState('');
  const [filteredTraits, setFilteredTraits] = useState([]);
  const [traits, setTraits] = useState([]);

  const handleOnChange = (e) => {
    setParam(e.target.value);
  };

  useEffect(() => {
    collectionTraits
      .filter((t, i) => t.trait_type === traitType)
      .map((t, i) => setTraits((prevTraits) => [...prevTraits, t]));
  }, []);

  useEffect(() => {
    if (param.length > 0) {
      return setFilteredTraits(
        traits.filter(({ value }) =>
          value?.toLowerCase().includes(param.toLowerCase())
        )
      );
    }
    setFilteredTraits([]);
  }, [param]);

  if (traits.length < 5 && traits.some((trait) => !trait.displayType))
    return (
      <>
        {traits.map((trait, i) => (
          <Checkbox
            traitType={trait.trait_type}
            label={trait.value}
            key={i}
            setFilters={setFilters}
            filters={filters}
            extra={trait.trait_count}
          />
        ))}
      </>
    );

  if (
    traits.some(
      (trait) =>
        trait.displayType === 'number' ||
        trait.displayType === 'date' ||
        typeof trait.value === 'number'
    )
  ) {
    return (
      <Range
        traits={traits}
        filters={filters}
        setFilters={setFilters}
        traitType={traitType}
      />
    );
  }

  return (
    <>
      <input
        type='text'
        value={param}
        onChange={handleOnChange}
        placeholder='Filter'
      />
      {param.length === 0 ? (
        <>
          {traits.map((trait, i) => (
            <Checkbox
              traitType={trait.trait_type}
              label={trait.value}
              key={i}
              setFilters={setFilters}
              filters={filters}
              extra={trait.trait_count}
            />
          ))}
        </>
      ) : (
        <>
          {filteredTraits.map(({ value, traitType, traitCount }, i) => {
            return (
              <Checkbox
                traitType={traitType}
                label={value}
                key={i}
                setFilters={setFilters}
                filters={filters}
                extra={traitCount}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default SearchFilters;
