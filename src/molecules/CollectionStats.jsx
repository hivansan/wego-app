import React from 'react';
import { FaEthereum } from 'react-icons/fa';

const CollectionStats = ({ collection: stats }) => {
  return (
    <>
      {stats && (
        <>
          <div className='collection-additionals-stats'>
            <div className='stat'>
              <small>7 Day Volume</small>
              <small>{stats.sevenDayVolume} ETH</small>
            </div>
            <div className='stat'>
              <small>Total Volume</small>
              <small>{stats.totalVolume} ETH</small>
            </div>
            <div className='stat'>
              <small>7 Day Avg Price</small>
              <small>{stats.sevenDayAveragePrice} ETH</small>
            </div>
            <div className='stat'>
              <small>Total Sales</small>
              <small>{stats.totalSales}</small>
            </div>
          </div>
          <div className='collection-stats'>
            <div className='stat'>
              <p>{stats.totalSupply}</p>
              <small>Total Items</small>
            </div>
            <div className='stat'>
              <p>
                {stats.floorPrice} <FaEthereum size={20} />
              </p>
              <small>Floor price</small>
            </div>
            <div className='stat'>
              <p>{stats.numOwners}</p>
              <small>Owners</small>
            </div>
          </div>{' '}
        </>
      )}
    </>
  );
};

export default CollectionStats;
