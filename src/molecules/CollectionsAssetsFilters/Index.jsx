import React, { useState } from 'react';

import { FiFilter } from 'react-icons/fi';
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Checkbox from '../../atoms/Checkbox';
import Filter from './Filter';
import SearchFilters from './SearchFilters';

const CollectionAssetsFilters = ({
  isCollapse,
  setCollapse,
  collectionTraits,
  setCollectionTraits,
  setFilters,
  filters,
  filtersMobileOpen,
}) => {
  const setIsCollapse = () => setCollapse(!isCollapse);
  const newArr = [];

  if (collectionTraits) {
    const myObj = {};
    collectionTraits.forEach((el) => {
      if (!(el.trait_type in myObj)) {
        myObj[el.trait_type] = true;
        newArr.push(el.trait_type);
      }
    });
  }

  if (isCollapse) {
    return (
      <div className='filter-collapse collection-assets-filters'>
        <header onClick={setIsCollapse}>
          <BiArrowToRight size={20} />
        </header>
      </div>
    );
  }

  return (
    <div className='collection-assets-filters'>
      <div>
        <header onClick={setIsCollapse}>
          <div className='header-collapsed-off'>
            <div className='header-action-collapse'>Filter</div>
          </div>
          <BiArrowToLeft size={20} />
        </header>
        <Filter title='Status' isCollapse={isCollapse}></Filter>
        <Filter title='Price' isCollapse={isCollapse}></Filter>
        {collectionTraits &&
          newArr.map((traitType) => (
            <Filter title={traitType} key={traitType} isCollapse={isCollapse}>
              <SearchFilters
                collectionTraits={collectionTraits}
                traitType={traitType}
                setFilters={setFilters}
                filters={filters}
              />
            </Filter>
          ))}
      </div>
    </div>
  );
};

export default CollectionAssetsFilters;
