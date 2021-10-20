import React, { useState, useEffect } from 'react';
import Checkbox from '../../atoms/Checkbox';

const SearchFilters = ({
  traitType,
  collectionTraits,
  setFilters,
  filters,
}) => {
  const [param, setParam] = useState('');
  const [filteredTraits, setFilteredTraits] = useState([]);

  const traits = [];
  let traitsObj = {};

  collectionTraits.map((trait, i) => {
    if (trait.trait_type === traitType) {
      traitsObj = { traitType, value: trait.value };
      traits.push(traitsObj);
    }
  });

  const handleOnChange = (e) => {
    setParam(e.target.value);
  };

  useEffect(() => {
    if (param.length > 0) {
      return setFilteredTraits(
        traits.filter(({ value }) =>
          value.toLowerCase().includes(param.toLowerCase())
        )
      );
    }
    setFilteredTraits([]);
  }, [param]);

  if (traits.length < 5)
    return (
      <>
        {collectionTraits.map((trait, i) => {
          if (trait.trait_type === traitType) {
            return (
              <Checkbox
                traitType={traitType}
                label={trait.value}
                key={i}
                setFilters={setFilters}
                filters={filters}
              />
            );
          }
        })}
      </>
    );

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
          {collectionTraits.map((trait, i) => {
            if (trait.trait_type === traitType) {
              return (
                <Checkbox
                  traitType={traitType}
                  label={trait.value}
                  key={i}
                  setFilters={setFilters}
                  filters={filters}
                />
              );
            }
          })}
        </>
      ) : (
        <>
          {filteredTraits.map(({ value, traitType }, i) => {
            return (
              <Checkbox
                typeTrait={traitType}
                label={value}
                key={i}
                setFilters={setFilters}
                filters={filters}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default SearchFilters;
