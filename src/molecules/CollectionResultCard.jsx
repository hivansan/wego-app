import React from 'react';

import { Link } from 'react-router-dom';

import { FaEthereum } from 'react-icons/fa';

const CollectionResultCard = ({ collection, location }) => {
  const FilterPreviewAssets = collection.assets.filter((a, i) => i < 3);

  return (
    <div className='collection-result-card'>
      <header>Collection</header>
      <div className='collection-result-card-body'>
        <div className='collection-info'>
          <div className='collection-result-card-info-container'>
            <div className='collection-result-card-info'>
              <img src={collection.image} alt={collection.name} />
              <div className='info'>
                <Link to={`collection/${collection.address}`}>
                  <p>{collection.name}</p>
                </Link>
                <small>428 traded</small>
              </div>
            </div>
            <div className='card-info-stats'>
              <p>
                Release date: <strong>{collection.dateAdded}</strong>
              </p>
              <p>
                Owners: <strong>{collection.owners}</strong>
              </p>
              <p>
                Price history: <strong>stat</strong>
              </p>
            </div>
          </div>
          <div className='collection-result-card-stats'>
            <p>
              Total items: <strong>{collection.totalItems}</strong>
            </p>
            <p>
              ETH Total Volume:{' '}
              <strong>
                {collection.totalItems} <FaEthereum size={15} />
              </strong>
            </p>
            <p>
              7 day volume:
              <strong>
                {collection.totalItems}
                <FaEthereum size={15} />
              </strong>
            </p>
          </div>
        </div>
        <div className='collection-result-card-s'>
          <div className='assets'>
            <p>Assets</p>
            <div className='assets-container'>
              {FilterPreviewAssets.map((asset, i) => (
                <div className='asset' key={i}>
                  <Link
                    to={{
                      pathname: `assets/${asset.address}/${asset.tokenId}`,
                      state: { background: location },
                    }}
                  >
                    <img src={asset.image} alt='' />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className='wego-score'>
            <p>WEGO Score</p>
            <small>89</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionResultCard;
