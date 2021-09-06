import React from 'react';

import { FaEthereum } from 'react-icons/fa';

const CollectionAssetCard = ({
  assetImage = 'https://lh3.googleusercontent.com/DFWF5M0TDAk5HChLQWv88kL84TdOciZLrBm_UFszYDmPNP9K86gyhhcMQ7Resz_33tBIqK-dOTx6BCagEcP8qtxmuqSldNUTf_Y5ng=w600',
  assetName = 'Asset Name',
  price = '429.69',
  className,
  ...props
}) => {
  const hasExtraClasses = className ? className : '';

  return (
    <div {...props} className={`${hasExtraClasses} collection-asset-card`}>
      <div className='asset-card-header'>
        <p>#1</p>
        <p>{assetName}</p>
      </div>
      <div className='asset-card-image'>
        <img src={assetImage} alt='asset' />
      </div>
      <div className='asset-card-info'>
        <p>Alita</p>
        <p>
          {price} <FaEthereum size={20} />
        </p>
      </div>
    </div>
  );
};

export default CollectionAssetCard;
