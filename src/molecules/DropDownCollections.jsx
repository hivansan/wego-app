import React, { useState, useEffect } from 'react';
import DropDownCollectionItem from './DropdownResults/homeResults/CollectionsResults/DropDownCollectionItem';

const DropDownCollections = ({ results, location }) => {
  const collectionsFiletered = results.results
    .filter((item) => item.meta.index === 'collections')
    .filter((a, i) => i < 4);

  return (
    <>
      {collectionsFiletered.length > 0 && (
        <div className='drop-down-collections'>
          <header>Collections</header>
          {collectionsFiletered
            .filter((item) => item.value.featuredCollection)
            .map((item, i) => (
              <DropDownCollectionItem collection={item} key={i} />
            ))}
          {collectionsFiletered
            .filter((item) => !item.value.featuredCollection)
            .map(({ value: collection }, i) => (
              <DropDownCollectionItem
                collection={collection}
                key={collection.contractAddress + i}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default DropDownCollections;
