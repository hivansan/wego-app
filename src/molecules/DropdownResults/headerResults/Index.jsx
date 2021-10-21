import React from 'react';
import { Link } from 'react-router-dom';
import ImageTypeDetect from '../../../molecules/ImageTypeDetect';
import { GoVerified } from 'react-icons/go';

const HeaderResults = ({ results, location, isOpen }) => {
  const resultsHastExactMatch = results.results.filter(
    (item) => item.meta.isExact
  )[0];

  return (
    <>
      {results && (
        <ul>
          {results.results
            .filter((result) => result.meta.index === 'collections')
            .filter((e, i) => i < 5).length !== 0 && <li>Collections</li>}
          {results.results
            .filter((result) => result.meta.index === 'collections')
            .filter((e, i) => i < 5)
            .map(({ value: collection }, i) => (
              <a
                href={`/collection/${collection.slug}`}
                key={collection.id + i}
              >
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
            .map(({ value: asset }, i) => (
              <Link
                to={{
                  pathname: `/assets/${
                    asset?.contractAddress || asset.asset_contract.address
                  }/${asset?.tokenId || asset.token_id}`,
                  state: { background: location, searchResults: isOpen },
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
        </ul>
      )}
    </>
  );
};

export default HeaderResults;
