import React from 'react';

import moment from 'moment';
import { Link } from 'react-router-dom';
import ImageTypeDetect from '../molecules/ImageTypeDetect';
import DropDownAssetItem from './DropdownResults/homeResults/AssetsResults/DropDownAssetItem';

const DropDownAssets = ({ results, location, isOpen }) => {
  const assetsFiltered = results.results
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
              key={asset.id + i}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DropDownAssets;
