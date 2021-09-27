import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';
import ImageTypeDetect from './ImageTypeDetect';

const CollectionAssetCard = ({
  price = '429.69',
  className,
  asset,
  location,
  ...props
}) => {
  const hasExtraClasses = className ? className : '';
  return (
    <Link
      to={{
        pathname: `/assets/${asset.asset_contract.address}/${asset.token_id}`,
        state: { background: location },
      }}
    >
      <div {...props} className={`${hasExtraClasses} collection-asset-card`}>
        <div className='asset-card-header'>
          <p>
            {asset.collection.slug
              .split('-')
              .map((a) => a.charAt(0).toUpperCase() + a.substr(1))
              .join(' ')}
          </p>
        </div>
        <div className='asset-card-image'>
          <ImageTypeDetect imageURL={asset.image_url} alt={asset.name} />
        </div>
        <div className='asset-card-info'>
          <p>{asset.name ? asset.name : asset.token_id}</p>

          {/* <p>
            {price} <FaEthereum size={20} />
          </p> */}
        </div>
      </div>
    </Link>
  );
};

export default CollectionAssetCard;
