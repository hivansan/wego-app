import React from 'react';
import { FaEthereum } from 'react-icons/fa';

const CollectionStats = ({ stats }) => {
  return (
    <>
      <div className='collection-additionals-stats'>
        <div className='stat'>
          <small>7 Day Volume</small>
          <small>32.25 ETH</small>
        </div>
        <div className='stat'>
          <small>7 Day Volume</small>
          <small>32.25 ETH</small>
        </div>
        <div className='stat'>
          <small>7 Day Volume</small>
          <small>32.25 ETH</small>
        </div>
        <div className='stat'>
          <small>7 Day Volume</small>
          <small>32.25 ETH</small>
        </div>
      </div>

      <div className='collection-stats'>
        <div className='stat'>
          <p>16,386</p>
          <small>total</small>
        </div>
        <div className='stat'>
          <p>
            16,386 <FaEthereum size={20} />
          </p>
          <small>total</small>
        </div>
        <div className='stat'>
          <p>16,386</p>
          <small>total</small>
        </div>
      </div>
    </>
  );
};

export default CollectionStats;
