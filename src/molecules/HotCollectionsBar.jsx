import React from 'react';

import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

const HotCollectionsBar = ({ hotCollections }) => {
  return (
    <div className='hot-collections-bar'>
      <div className='price'>
        <p>ETH: $3740.71</p>
      </div>
      <div className='price'>
        <p>139 GWEI</p>
      </div>
      <div className='price'>
        <p>HOT PAIRS</p>
      </div>
      {!hotCollections ? (
        <div className='hot-collections'></div>
      ) : (
        <div className='hot-collections'>
          {hotCollections.hotCollections.map((collection, i) => (
            <div className='hot-collection' key={collection.address}>
              <small>#{i + 1}</small>
              {collection.state === 'up' ? (
                <FiArrowUpCircle size={15} color={'green'} />
              ) : (
                <FiArrowDownCircle size={15} color={'red'} />
              )}
              <p>{collection.name}</p>
              <img src={collection.image} alt={collection.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotCollectionsBar;
