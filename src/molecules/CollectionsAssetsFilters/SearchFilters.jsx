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
/*
  useEffect(() => {
    
    
    setTraits((prevTraits) => [...prevTraits, {
      traitType,
      value: 'Has no trait',
      traitCount: null,
      displayType: null
    }]);
    

    collectionTraits.forEach((trait, i) => {
      let traitsObj = {};
      if (trait.trait_type === traitType) {
        traitsObj = {
          traitType,
          value: trait.value,
          traitCount: trait.trait_count,
          displayType: trait?.display_type,
        };
        setTraits((prevTraits) => [...prevTraits, traitsObj]);
      }
    });
  }, []);
*/

  const handleOnChange = (e) => {
    setParam(e.target.value);
  };

  useEffect(() => {
    collectionTraits
      .filter((t, i) => t.trait_type === traitType)
      .forEach((t, i) => setTraits((prevTraits) => [...prevTraits, t]));
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

  if (traits.length < 5 && traits.some((trait) => !trait.display_type))
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
        trait.display_type === 'number' ||
        trait.display_type === 'date' ||
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
          {traits.map((trait, i) => 
            <Checkbox
              traitType={traitType}
              label={trait.value}
              key={i}
              setFilters={setFilters}
              filters={filters}
              extra={trait.trait_count}
            />
          )}
        </>
      ) : (
        <>
          {filteredTraits.map(({ value, trait_type, trait_count }, i) => {
            return (
              <Checkbox
                traitType={trait_type}
                label={value}
                key={i}
                setFilters={setFilters}
                filters={filters}
                extra={trait_count}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default SearchFilters;
