import React from 'react';

const DropDownAssets = ({ results }) => {
  const FilterA = results.filter((a, i) => i < 4);

  return (
    <div className='drop-down-assets'>
      <header>Assets</header>
      {FilterA.map((asset) => (
        <a href='/#' key={asset.address}>
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
        </a>
      ))}
      <a href='/#'>450 see more...</a>
    </div>
  );
};

export default DropDownAssets;
