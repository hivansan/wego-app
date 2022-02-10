import React from 'react';
import { FaEthereum } from 'react-icons/fa';

const CollectionStats = ({ collection: stats, mode='all' }) => {

  if (mode === 'row') {
    return (
      <>
        {stats && (
          <div className="collection-stats">
            <div className='stat'>
              <small>
                {(stats.stats?.floorPrice &&
                  stats.stats?.floorPrice.toString().substr(0, 5)) ||
                  (stats.floorPrice &&
                    stats.floorPrice.toString().substr(0, 5)) ||
                  0}{' '}
                <FaEthereum size={14} className='token token-secondary' />
              </small>
            </div>
            <div className='stat'>
              <small>
                {(stats?.stats?.sevenDayVolume &&
                  stats?.stats?.sevenDayVolume.toString().substr(0, 6)) ||
                  (stats.sevenDayVolume &&
                    stats.sevenDayVolume.toString().substr(0, 6)) ||
                  0}{' '}
                <FaEthereum size={14} className='token token-secondary' />
              </small>
            </div>

            <div className='stat'>
              <small>
                {(stats?.stats?.oneDayChange &&
                  <span className={stats.stats.oneDayChange > 0 ? 'price-up' : 'price-down'}> {stats.stats.oneDayChange.toFixed(3)} </span>)
                  || 0}
                <FaEthereum size={14} className='token token-secondary' />
              </small>
            </div>
            <div className='stat'>
              <small>
                {(stats?.stats?.sevenDayChange &&
                  <span className={stats.stats.sevenDayChange > 0 ? 'price-up' : 'price-down'}> {stats.stats.sevenDayChange.toFixed(3)} </span>)
                  || 0}
                <FaEthereum size={14} className='token token-secondary' />
              </small>
            </div>

            <div className='stat'>
              <small>
                {(stats?.stats?.thirtyDayChange &&
                  <span className={stats.stats.thirtyDayChange > 0 ? 'price-up' : 'price-down'}> {stats.stats.thirtyDayChange.toFixed(3)} </span>)
                  || 0}
                <FaEthereum size={14} className='token token-secondary' />
              </small>
            </div>

            <div className='stat'>
              <small>{stats.stats?.numOwners || stats.numOwners || 0}</small>
            </div>
            <div className='stat'>
              <small>{stats.stats?.totalSupply || stats.totalSupply || 0}</small>
            </div>
          </div>
        )}
      </>)
  }

  return (
    <>
      {stats && (
        <>
          <div className='collection-additionals-stats'>
            <div className='stat'>
              <small>7 Day Volume</small>
              <small>
                {(stats?.stats?.sevenDayVolume &&
                  stats?.stats?.sevenDayVolume.toString().substr(0, 6)) ||
                  (stats.sevenDayVolume &&
                    stats.sevenDayVolume.toString().substr(0, 6)) ||
                  0}{' '}
                ETH
              </small>
            </div>
            <div className='stat'>
              <small>Total Volume</small>
              <small>
                {(stats?.stats?.totalVolume &&
                  stats?.stats?.totalVolume.toString().substr(0, 7)) ||
                  Math.round(stats.totalVolume) ||
                  0}{' '}
                ETH
              </small>
            </div>
            <div className='stat'>
              <small>7 Day Avg Price</small>
              <small>
                {(stats.stats?.sevenDayAveragePrice &&
                  stats.stats?.sevenDayAveragePrice.toString().substr(0, 5)) ||
                  (stats.sevenDayAveragePrice &&
                    stats.sevenDayAveragePrice.toString().substr(0, 5)) ||
                  0}
                ETH
              </small>
            </div>

            <div className='stat'>
              <small>Total Sales</small>
              <small>{stats.stats?.totalSales || stats.totalSales || 0}</small>
            </div>
          </div>

          <div className='collection-price-variation'>
            <div className='stat'>
              <small>1 Day Price Var.</small>
              <small>
                {(stats?.stats?.oneDayChange &&
                  <span className={stats.stats.oneDayChange > 0 ? 'price-up' : 'price-down'}> {stats.stats.oneDayChange.toFixed(3)} </span>)
                  || 0}
                <FaEthereum size={14} className='token token-secondary' />
              </small>
            </div>
            <div className='stat'>
              <small>7 Days Price Var.</small>
              <small>
                {(stats?.stats?.sevenDayChange &&
                  <span className={stats.stats.sevenDayChange > 0 ? 'price-up' : 'price-down'}> {stats.stats.sevenDayChange.toFixed(3)} </span>)
                  || 0}
                <FaEthereum size={14} className='token token-secondary' />
              </small>
            </div>

            <div className='stat'>
              <small>30 Days Price Var.</small>
              <small>
                {(stats?.stats?.thirtyDayChange &&
                  <span className={stats.stats.thirtyDayChange > 0 ? 'price-up' : 'price-down'}> {stats.stats.thirtyDayChange.toFixed(3)} </span>)
                  || 0}
                <FaEthereum size={14} className='token token-secondary' />
              </small>
            </div>
          </div>

          <div className='collection-stats'>
            <div className='stat'>
              <p>{stats.stats?.totalSupply || stats.totalSupply || 0}</p>
              <small>Total Items</small>
            </div>
            <div className='stat'>
              <p>
                {(stats.stats?.floorPrice &&
                  stats.stats?.floorPrice.toString().substr(0, 5)) ||
                  (stats.floorPrice &&
                    stats.floorPrice.toString().substr(0, 5)) ||
                  0}{' '}
                <FaEthereum size={20} />
              </p>
              <small>Floor price</small>
            </div>
            <div className='stat'>
              <p>{stats.stats?.numOwners || stats.numOwners || 0}</p>
              <small>Owners</small>
            </div>
          </div>{' '}
        </>
      )}
    </>
  );
};

export default CollectionStats;
