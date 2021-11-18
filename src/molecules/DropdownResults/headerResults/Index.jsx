import React from 'react';
import { Link } from 'react-router-dom';
import ImageTypeDetect from '../../../molecules/ImageTypeDetect';
import { GoVerified } from 'react-icons/go';

const HeaderResults = ({ results, location, isOpen }) => {
  const assetsFiltered =
    !results.status &&
    results.results.filter((item) => item.meta.index === 'assets');

  return (
    <>
      {results && !results.status && (
        <ul>
          {results.results
            .filter((result) => result.meta.index === 'collections')
            .filter((e, i) => i < 5).length !== 0 && <li>Collections</li>}
          {results.results
            .filter((result) => result.value.featuredCollection)
            .filter((e, i) => i < 5)
            .map((collection, i) => (
              <a href={`/collection/${collection.slug}`} key={i}>
                <li>
                  <ImageTypeDetect
                    imageURL={collection.imgMain}
                    alt={collection.name}
                    className='result-img'
                  />
                  {collection.name}
                  <span className='badge'>Featured</span>
                </li>
              </a>
            ))}
          {results.results
            .filter((result) => result.meta.index === 'collections')
            .filter((result) => !result.value.featuredCollection)
            .filter((e, i) => i < 5)
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
          {assetsFiltered.length !== 0 && <li>Assets</li>}
          {results.results
            .filter((result) => result.meta.index === 'assets')
            .filter((e, i) => i < 5)
            .map(({ value: asset }, i) => (
              <Link
                to={{
                  pathname: `/assets/${asset?.contractAddress || asset.asset_contract.address
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
      )
      }
    </>
  );
};

export default HeaderResults;
