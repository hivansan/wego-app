import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';
import ImageTypeDetect from './ImageTypeDetect';

const CollectionAssetCard = ({
  className,
  asset,
  location,
  style,
  index,
  image,
  isScrolling,
  collectionImg,
}) => {
  const hasExtraClasses = className ? className : '';
  const tokenIdTrimmed =
    asset[index].token_id > 8 ? (
      <>
        {asset[index].token_id.substring(0, 8)}...
        {asset[index].token_id.substring(
          asset[index].token_id.length - 5,
          asset[index].token_id.length - 1
        )}
      </>
    ) : (
      <>{asset[index].token_id}</>
    );

  return (
    <Link
      key={asset[index].id}
      to={{
        pathname: `/assets/${
          asset[index].asset_contract?.address || asset[index].contractAddress
        }/${asset[index].tokenId}`,
        state: { background: location },
      }}
    >
      <article className={`${hasExtraClasses} collection-asset-card`}>
        <section className='asset-card-header'>
          <p>
            {asset[index].collection ? (
              <>
                {' '}
                {asset[index].collection.name
                  ? `${asset[index].collection.name}`
                  : `${asset[index].collection.slug
                      .split('-')
                      .map((a) => a.charAt(0).toUpperCase() + a.substr(1))
                      .join(' ')}`}
              </>
            ) : (
              `${asset[index].slug
                .split('-')
                .map((a) => a.charAt(0).toUpperCase() + a.substr(1))
                .join(' ')}`
            )}
          </p>
        </section>
        <section className='asset-card-image'>
          {asset[index].imageBig ? (
            <ImageTypeDetect
              imageURL={asset[index].imageSmall}
              alt={asset[index].name}
              className='img'
            />
          ) : (
            <ImageTypeDetect
              imageURL={collectionImg}
              alt={asset[index].slug}
              className='img'
            />
          )}
        </section>
        <section className='asset-card-info'>
          <p>{asset[index].name ? asset[index].name : tokenIdTrimmed}</p>

          {/* <p>
            {price} <FaEthereum size={20} />

          </p> */}
        </section>
      </article>
    </Link>
  );
};

export default CollectionAssetCard;
