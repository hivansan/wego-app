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
          <small>{collection.ethTotalVolume} ETH</small>
        </div>
        <div className='stat'>
          <small>7 Day Avg Price</small>
          <small>{collection.sevenDayAvgPrice} ETH</small>
        </div>
        <div className='stat'>
          <small>Owners</small>
          <small>{collection.owners}</small>
        </div>
      </div>

      <div className='collection-stats'>
        <div className='stat'>
          <p>{collection.total}</p>
          <small>total</small>
        </div>
        <div className='stat'>
          <p>
            {collection.priceFloor} <FaEthereum size={20} />
          </p>
          <small>Price floor</small>
        </div>
        <div className='stat'>
          <p>{collection.volumeTraded}</p>
          <small>Volume traded</small>
        </div>
      </div>
    </>
  );
};

export default CollectionStats;
