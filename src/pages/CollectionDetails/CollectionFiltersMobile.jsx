import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosClose } from 'react-icons/io';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Filter from '../../molecules/CollectionsAssetsFilters/Filter';
import SearchFilters from '../../molecules/CollectionsAssetsFilters/SearchFilters';

const CollectionAssetsFiltersMobile = ({
  collectionTraits,
  setFilters,
  filters,

  isOpen,
  setIsOpen,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
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

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <Dialog fullScreen={true} open={isOpen}>
      <header
        onClick={() => setIsOpen(false)}
        className='collection-assets-filters-mobile-header'
      >
        <div>Filter</div>
        <IoIosClose />
      </header>
      <DialogContent className='collection-assets-filters-mobile'>
        {/* <Filter title='Status'></Filter>
      <Filter title='Price'></Filter> */}
        {collectionTraits &&
          newArr.map((traitType, i) => (
            <Filter title={traitType} key={i}>
              <SearchFilters
                collectionTraits={collectionTraits}
                traitType={traitType}
                setFilters={setFilters}
                filters={filters}
              />
            </Filter>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CollectionAssetsFiltersMobile;
