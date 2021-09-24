import React from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';

import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

const HotCollectionsBar = ({ hotCollections }) => {
  return (
    <div className='hot-collections-bar'>
      {hotCollections && (
        <ScrollContainer className='hot-collections'>
          {hotCollections.hotCollections.map((collection, i) => (
            <a href={`/collection/${collection.slug}`} key={collection.id}>
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
