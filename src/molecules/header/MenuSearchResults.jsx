import React from 'react';

import { Link } from 'react-router-dom';
import ImageTypeDetect from '../ImageTypeDetect';

const MenuSearchResults = ({ results, location, query }) => {
  return (
    <>
      {results && (
        <ul>
          {results.results.length === 0 ? (
            <small className='text-center'>No items founded</small>
          ) : (
            <>
              {' '}
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
              {results.results
                .filter((result) => result.meta.index === 'collections')
                .filter((e, i) => i < 6).length !== 0 && <li>Collections</li>}
              {results.results
                .filter((result) => result.meta.index === 'collections')
                .filter((e, i) => i < 6)
                .map(({ value: collection }, i) => (
                  <a href={`/collection/${collection.slug}`} key={i}>
                    <li>
                      <ImageTypeDetect
                        imageURL={collection.imgMain}
                        alt={collection.name}
                        className='result-img'
                      />
                      {collection.name}
                    </li>
                  </a>
                ))}
              {results.results
                .filter((result) => result.meta.index === 'assets')
                .filter((e, i) => i < 6).length !== 0 && <li>Assets</li>}
              {results.results
                .filter((result) => result.meta.index === 'assets')
                .filter((e, i) => i < 6)
                .map(({ value: asset }, i) => (
                  <Link
                    to={{
                      pathname: `/assets/${
                        asset.contractAddress
                          ? asset.contractAddress
                          : asset.asset_contract.address
                      }/${asset.tokenId ? asset.tokenId : asset.token_id}`,
                      state: { background: location },
                    }}
                    key={i}
                  >
                    <li>
                      <ImageTypeDetect
                        imageURL={asset?.image_preview_url || asset.imageSmall}
                        alt={''}
                        className='result-img'
                      />
                      {asset.name}
                    </li>
                  </Link>
                ))}
              <a href={`/search?q=${encodeURI(query)}`} className='all-results'>
                <li> Show all results</li>
              </a>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default MenuSearchResults;
