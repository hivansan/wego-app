import React from 'react';

import { Link } from 'react-router-dom';

import ImageTypeDetect from './ImageTypeDetect';

const TopCollectionsCard = ({ topCollections, title, ...props }) => {
  console.log(topCollections);

  return (
    <div className='top-collections-card shadow-sm' {...props}>
      <h5 className='card-title'>{title}</h5>
      {topCollections && (
        <>
          {topCollections.map(({ value: collection }, idx) => (
            <Link to={`collection/${collection.slug}`} key={collection.slug}>
              <section className='collection-info'>
                <p>{`#${idx + 1}`}</p>
                <ImageTypeDetect
                  imageURL={collection.imgMain}
                  className='collection-pic'
                  alt='collection pic'
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
