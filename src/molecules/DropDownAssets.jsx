import React from 'react';

import { Link } from 'react-router-dom';

const DropDownAssets = ({ results, location }) => {
  const FilterA = results.filter((a, i) => i < 4);

  return (
    <div className='drop-down-assets'>
      <header>Assets</header>
      {FilterA.map((asset) => (
        <Link
          to={{
            pathname: `assets/${asset.address}/1`,
            state: { background: location },
          }}
          key={asset.address}
        >
          <div className='asset'>
            <div className='asset-info-container'>
              <img src={asset.image} alt={asset.name} />
              <div className='asset-info'>
                <p>{asset.name}</p>
                <small>0.3 ETH</small>
              </div>
            </div>
            <div className='asset-stats'>
              <div className='stat'>
                <small>
                  Release date: <strong>{asset.dateAdded}</strong>
                </small>
                <small>
                  Owners: <strong>{asset.owners}</strong>
                </small>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <a href='/#'>450 see more...</a>
    </div>
  );
};

export default DropDownAssets;
