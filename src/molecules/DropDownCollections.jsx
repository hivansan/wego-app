import React from 'react';
import { Link } from 'react-router-dom';

const DropDownCollections = ({ results, location }) => {
  const FilterA = results.filter((a, i) => i < 4);

  return (
    <div className='drop-down-collections'>
      <header>Collections</header>
      {FilterA.map((collection) => (
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
                <p>{collection.name}</p>
                <div className='trades'>
                  <p>429 trades</p>
                  <small>{collection.totalItems} items</small>
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
