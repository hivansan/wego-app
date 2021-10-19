import React, { useState, useEffect } from 'react';

import { FiFilter } from 'react-icons/fi';
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Checkbox from '../../atoms/Checkbox';
import Filter from '../../molecules/CollectionsAssetsFilters/Filter';
import SearchFilters from '../../molecules/CollectionsAssetsFilters/SearchFilters';

const CollectionAssetsFiltersMobile = ({
  collectionTraits,
  setFilters,
  filters,
  setTraits,
}) => {
  const newArr = [];
  const myObj = {};

  if (collectionTraits) {
    collectionTraits.forEach((el) => {
      if (!(el.trait_type in myObj)) {
        myObj[el.trait_type] = true;
        newArr.push(el.trait_type);
      }
    });
  }

  return (
    <div className='collection-assets-filters-mobile'>
      <header>
        <div>Filter</div>
      </header>
      {/* <Filter title='Status'></Filter>
      <Filter title='Price'></Filter> */}
      {collectionTraits &&
        newArr.map((traitType) => (
          <Filter title={traitType} key={traitType}>
            <SearchFilters
              collectionTraits={collectionTraits}
              traitType={traitType}
              setFilters={setFilters}
              filters={filters}
            />
          </Filter>
        ))}
    </div>
  );
};

export default CollectionAssetsFiltersMobile;
