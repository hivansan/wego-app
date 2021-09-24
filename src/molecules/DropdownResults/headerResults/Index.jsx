import React from 'react';
import { Link } from 'react-router-dom';

const HeaderResults = ({ results, location }) => {
  const featuredCollections = results.collections.filter(
    (collection) => collection.featuredCollection
  );
  const noFeatured = results.collections.filter(
    (collection) => !collection.featuredCollection
  );
  return (
    <>
      {results && (
        <ul>
          {results.exactMatch && (
            <>
              <li>Exact Match</li>
              <a href={`/collection/${results.exactMatch.slug}`}>
                <li>
                  <img
                    src={results.exactMatch.image}
                    alt={results.exactMatch.name}
                  />
                  {results.exactMatch.name}
                </li>
              </a>
            </>
          )}

          <li>Collections</li>
          {featuredCollections.map((collection) => (
            <a href={`/collection/${collection.slug}`} key={collection.id}>
              <li>
                <img src={collection.image} alt={collection.name} />
                {collection.name}
                <span className='badge bg-primary text-white'>Featured</span>
              </li>
            </a>
          ))}
          {noFeatured.map((collection) => (
            <a href={`/collection/${collection.slug}`} key={collection.id}>
              <li>
                <img src={collection.image} alt={collection.name} />
                {collection.name}
              </li>
            </a>
          ))}

          <li>Assets</li>
          {results.assets.map((asset) => (
            <Link
              to={{
                pathname: `/assets/${asset.address}/${asset.tokenId}`,
                state: { background: location },
              }}
              key={asset.id}
            >
              <li>
                <img src={asset.image} alt={asset.name} /> {asset.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default HeaderResults;
