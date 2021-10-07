import React from 'react';

import { Link } from 'react-router-dom';

const TopCollectionsCard = ({ topCollections, title, ...props }) => {
  return (
    <div className='top-collections-card shadow-sm' {...props}>
      <h5 className='card-title'>{title}</h5>
      {topCollections && (
        <>
          {topCollections.map(({ value: collection }, idx) => (
            <Link to={`collection/${collection.slug}`} key={collection.slug}>
              <section className='collection-info'>
                <p>{`#${idx + 1}`}</p>
                <img
                  src={
                    collection.imgMain
                      ? collection.imgMain
                      : 'https://storage.googleapis.com/opensea-static/opensea-profile/2.png'
                  }
                  alt='collection pic'
                  className='collection-pic'
                />
                <div className='collection-data'>
                  <p>
                    {collection.name ? (
                      collection.name.length > 15 ? (
                        <>{collection.name.substring(0, 15)}..</>
                      ) : (
                        <>{collection.name}</>
                      )
                    ) : (
                      `${collection.slug}`
                    )}
                  </p>
                </div>
              </section>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default TopCollectionsCard;
