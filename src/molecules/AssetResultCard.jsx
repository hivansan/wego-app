import React from 'react';

import { FaEthereum } from 'react-icons/fa';

const AssetResultCard = ({ asset }) => {
  return (
    <div className='asset-result-card'>
      <header>Asset</header>
      <div className='asset-result-card-body'>
        <div className='asset-info'>
          <div className='asset-result-card-info-container'>
            <div className='asset-result-card-info'>
              <img src={asset.image} alt={asset.name} />
              <div className='info'>
                <p>{asset.name}</p>
                <small>428 traded</small>
              </div>
            </div>
            <div className='asset-card-info-stats'>
              <p>
                Release date: <strong>{asset.dateAdded}</strong>
              </p>
              <p>
                Owners: <strong>{asset.owners}</strong>
              </p>
              <p>
                Price history: <strong>stat</strong>
              </p>
            </div>
          </div>
          <div className='asset-result-card-stats'>
            <p>
              Total items: <strong>{asset.totalItems}</strong>
            </p>
            <p>
              ETH Total Volume:{' '}
              <strong>
                {asset.totalItems} <FaEthereum size={15} />
              </strong>
            </p>
            <p>
              {' '}
              7 day volume:{' '}
              <strong>
                {asset.totalItems}
                <FaEthereum size={15} />
              </strong>
            </p>
            <p>
              Market overview: <strong>stat</strong>
            </p>
          </div>
        </div>
        <div className='asset-result-card-s'>
          <div className='asset-preview'>
            <div className='asset'>
              <p>Preview</p>
              <img src={asset.image} alt={asset.name} />
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

export default AssetResultCard;
