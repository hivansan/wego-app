import React from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';

import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

const HotCollectionsBar = ({ hotCollections }) => {
  return (
    <div className='hot-collections-bar'>
      <div className='price'>
        <p>ETH: $3740.71</p>
      </div>
      <div className='price d-none d-lg-flex'>
        <p>139 GWEI</p>
      </div>
      <div className='price d-none d-lg-flex'>
        <p>HOT PAIRS</p>
      </div>
      {!hotCollections ? (
        <div className='hot-collections'></div>
      ) : (
        <ScrollContainer className='hot-collections'>
          {hotCollections.hotCollections.map((collection, i) => (
            <a
              href={`/collection/${collection.address}`}
              key={collection.address}
            >
              <div className='hot-collection'>
                <small>#{i + 1}</small>
                {collection.state === 'up' ? (
                  <FiArrowUpCircle size={15} color={'green'} />
                ) : (
                  <FiArrowDownCircle size={15} color={'red'} />
                )}
                <p>{collection.name}</p>
                <img src={collection.image} alt={collection.name} />
              </div>
            </a>
          ))}
        </ScrollContainer>
      )}
    </div>
  );
};

export default HotCollectionsBar;
