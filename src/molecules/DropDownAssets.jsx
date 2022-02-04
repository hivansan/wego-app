import React from 'react';
import DropDownAssetItem from './DropdownResults/homeResults/AssetsResults/DropDownAssetItem';

const DropDownAssets = ({ resultsAssets, location, isOpen }) => {

  const assetsFiltered =
    !resultsAssets?.status &&
    resultsAssets.results
      .filter((item) => item.meta.index === 'assets')
      .filter((a, i) => i < 4);

  // console.log(assetsFiltered);

  return (
    <>
      {assetsFiltered.length > 0 && (
        <div className='drop-down-assets'>
          <header>Assets</header>
          {assetsFiltered.map(({ value: asset }, i) => (
            <DropDownAssetItem
              isOpen={isOpen}
              asset={asset}
              location={location}
              key={i}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DropDownAssets;
