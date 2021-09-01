import React from 'react';

const TopCollectionsCard = ({ topCollections, title, ...props }) => {
  return (
    <div className='top-collections-card shadow-sm' {...props}>
      <h5 className='card-title'>{title}</h5>
      {topCollections.map((collection, idx) => (
        <section key={collection.id} className='collection-info'>
          <p>{`#${idx + 1}`}</p>
          <img
            src={collection.avatar}
            alt='collection pic'
            className='collection-pic'
          />
          <div className='collection-data'>
            <p>{collection.name}</p>
            <small>{collection.ethereums} ETH </small>
          </div>
        </section>
      ))}
    </div>
  );
};

export default TopCollectionsCard;
