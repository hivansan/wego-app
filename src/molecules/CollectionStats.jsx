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
              <small>
                {stats.stats
                  ? stats.stats.sevenDayVolume
                  : stats.sevenDayVolume}{' '}
                ETH
              </small>
            </div>
            <div className='stat'>
              <small>Total Volume</small>
              <small>
                {stats.stats ? stats.stats.totalVolume : stats.totalVolume} ETH
              </small>
            </div>
            <div className='stat'>
              <small>7 Day Avg Price</small>
              <small>
                {stats.stats
                  ? stats.stats.sevenDayAveragePrice
                  : stats.sevenDayAveragePrice}
                ETH
              </small>
            </div>
            <div className='stat'>
              <small>Total Sales</small>
              <small>
                {stats.stats ? stats.stats.totalSales : stats.totalSales}
              </small>
            </div>
          </div>
          <div className='collection-stats'>
            <div className='stat'>
              <p>{stats.stats ? stats.stats.totalSupply : stats.totalSupply}</p>
              <small>Total Items</small>
            </div>
            <div className='stat'>
              <p>
                {stats.stats ? stats.stats.floorPrice : stats.floorPrice}{' '}
                <FaEthereum size={20} />
              </p>
              <small>Floor price</small>
            </div>
            <div className='stat'>
              <p>{stats.stats ? stats.stats.numOwners : stats.numOwners}</p>
              <small>Owners</small>
            </div>
          </div>{' '}
        </>
      )}
    </>
  );
};

export default CollectionStats;
