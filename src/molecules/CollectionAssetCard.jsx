import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';

const CollectionAssetCard = ({
  price = '429.69',
  className,
  asset,
  location,
  idx,
  ...props
}) => {
  const hasExtraClasses = className ? className : '';

  return (
    <Link
      to={{
        pathname: `/assets/${asset.address}/${asset.tokenId}`,
        state: { background: location },
      }}
    >
      <div {...props} className={`${hasExtraClasses} collection-asset-card`}>
        <div className='asset-card-header'>
          <p>{asset.asset_contract.name.split(/(?=[A-Z])/).join(' ')}</p>
        </div>
        <div className='asset-card-image'>
          <img src={asset.image_url} alt={asset.name} />
        </div>
        <div className='asset-card-info'>
          <p>{asset.token_id}</p>
          <p>
            {price} <FaEthereum size={20} />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CollectionAssetCard;
