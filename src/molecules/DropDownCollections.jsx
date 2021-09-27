import React from 'react';
import { Link } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';

const DropDownCollections = ({ results, location }) => {
  const featuredCollections = results.filter(
    (collection) => collection.featuredCollection
  );
  const noFeatured = results.filter(
    (collection) => !collection.featuredCollection
  );
  const FilterFour = (ar) => ar.filter((a, i) => i < 4);
  return (
    <div className='drop-down-collections'>
      <header>Collections</header>
      {FilterFour(featuredCollections).map((collection) => (
        <Link
          to={{
            pathname: `collection/${collection.slug}`,
          }}
          key={collection.id}
        >
          <div className='collection'>
            <div className='collection-info'>
              <img src={collection.image} alt={collection.name} />
              <div>
                <div className='d-flex'>
                  <p>{collection.name}</p>
                  <GoVerified size={20} className='mx-2' color='#1f71ba' />
                </div>
                <div className='trades'>
                  <p>429 trades</p>
                </div>
              </div>
            </div>
            <div className='collection-stats'>
              <small>
                Release date : <strong> {collection.dateAdded}</strong>
              </small>
              <small>
                Owners : <strong>{collection.owners}</strong>
              </small>
            </div>
          </div>
        </Link>
      ))}
      <a href='/#'>450 more...</a>
    </div>
  );
};

export default DropDownCollections;
