import React from 'react';
import { Link } from 'react-router-dom';
import ImageTypeDetect from '../../../molecules/ImageTypeDetect';
import { GoVerified } from 'react-icons/go';

const HeaderResults = ({ results, location }) => {
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

          {results.results
            .filter((result) => result.meta.index === 'collections')
            .filter((e, i) => i < 5).length !== 0 && <li>Collections</li>}
          {results.results
            .filter((result) => result.meta.index === 'collections')
            .filter((e, i) => i < 5)
            .map(({ value: collection }) => (
              <a href={`/collection/${collection.slug}`} key={collection.id}>
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
          <li>Assets</li>
          {results.results
            .filter((result) => result.meta.index === 'assets')
            .filter((e, i) => i < 5)
            .map(({ value: asset }) => (
              <Link
                to={{
                  pathname: `/assets/${
                    asset.contractAddress
                      ? asset.contractAddress
                      : asset.asset_contract.address
                  }/${asset.tokenId ? asset.tokenId : asset.token_id}`,
                  state: { background: location },
                }}
                key={asset.id}
              >
                <li>
                  {asset.image_preview_url ? (
                    <ImageTypeDetect
                      imageURL={asset.image_preview_url}
                      alt={''}
                      className='result-img'
                    />
                  ) : (
                    <img
                      src='https://i.stack.imgur.com/y9DpT.jpg'
                      alt=''
                      className='result-img'
                    />
                  )}{' '}
                  {asset.name}
                </li>
              </Link>
            ))}
        </ul>
      )}
    </>
  );
};

export default HeaderResults;
