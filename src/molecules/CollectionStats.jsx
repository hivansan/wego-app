import React from 'react';
import { FaEthereum } from 'react-icons/fa';

const CollectionStats = ({ collection }) => {
  return (
    <>
      <div className='collection-additionals-stats'>
        <div className='stat'>
          <small>7 Day Volume</small>
          <small>{collection.sevenDayVolume} ETH</small>
        </div>
        <div className='stat'>
          <small>Total Volume</small>
          <small>{collection.totalVolume} ETH</small>
        </div>
        <div className='stat'>
          <small>7 Day Avg Price</small>
          <small>{collection.sevenDayAveragePrice} ETH</small>
        </div>
        <div className='stat'>
          <small>Total Sales</small>
          <small>{collection.totalSales}</small>
        </div>
      </div>

      <div className='collection-stats'>
        <div className='stat'>
          <p>{collection.totalSupply}</p>
          <small>Total Items</small>
        </div>
        <div className='stat'>
          <p>
            {collection.floorPrice} <FaEthereum size={20} />
          </p>
          <small>Floor price</small>
        </div>
        <div className='stat'>
          <p>{collection.numOwners}</p>
          <small>Owners</small>
        </div>
      </div>
    </>
  );
};

export default CollectionStats;
