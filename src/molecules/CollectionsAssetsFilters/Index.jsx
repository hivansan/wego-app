import React, { useState, useEffect } from 'react';

import { HiFilter } from 'react-icons/hi';
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Checkbox from '../../atoms/Checkbox';
import Range from './Range';
import Filter from './Filter';
import SearchFilters from './SearchFilters';
import DarkPrimaryButton from '../../atoms/darkPrimaryButton';
import RangeFilters from './RangeFilters';

const CollectionAssetsFilters = ({
  isCollapse,
  setCollapse,
  collectionTraits,
  setFilters,
  filters,
}) => {
  const setIsCollapse = () => setCollapse(!isCollapse);
  const [traitTypes, setTraitTypes] = useState([]);
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

  return (
    <>
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

          {/* price filter */}
          <Filter title='Price usd' isCollapse={isCollapse}>
            <RangeFilters filter='priceUsd' />
          </Filter>

          {/* rank filter */}
          <Filter title='Rarity' isCollapse={isCollapse}>
            <RangeFilters filter='Rarity' />
          </Filter>

          {/* traits filters */}
          {collectionTraits &&
            newArr.map((traitType) => (
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
