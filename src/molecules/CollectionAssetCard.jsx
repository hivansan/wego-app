import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';
import Icon from 'react-crypto-icons';
import CryptoIcon from '../atoms/CryptoIcon';
import ImageTypeDetect from './ImageTypeDetect';

const CollectionAssetCard = ({
  className,
  asset,
  location,
  style,
  index,
  collectionImg,
  setFilters,
  filters,
}) => {
  const hasExtraClasses = className ? className : '';
  const tokenIdTrimmed =
    asset[index].tokenId > 26 ? (
      <>
        {asset[index].tokenId.substring(0, 8)}...
        {asset[index].tokenId.substring(
          asset[index].tokenId.length - 5,
          asset[index].tokenId.length - 1
        )}
      </>
    ) : (
      <>{asset[index].tokenId}</>
    );

  return (
    <Link
      key={asset[index].id}
      to={{
        pathname: `/assets/${
          asset[index].asset_contract?.address || asset[index].contractAddress
        }/${asset[index].tokenId}`,
        state: { background: location, filters: filters },
      }}
    >
      <article className={`${hasExtraClasses} collection-asset-card`}>
        <section className='asset-card-header'>
          {/* <p>
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
          </p> */}
          <p>
            {asset[index].name
              ? asset[index].name.length > 27
                ? asset[index].name.substring(0, 26)
                : asset[index].name
              : asset[index].tokenId}
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
          {/* <p>{asset[index].name ? asset[index].name : tokenIdTrimmed}</p> */}

          {/* <p>
            {price} <FaEthereum size={20} />

          </p> */}
          {/* {asset[index].lastSalePriceUSD && (
            <small>
              Last{' '}
              <strong>
                <small>$</small>{' '}
                {Math.round(asset[index].lastSalePriceUSD).toLocaleString()}
              </strong>
            </small>
          )} */}

          {/* <small>#{asset[index]?.tokenId?.substr(0, 25)}</small> */}
          {asset[index].rarityScoreRank && (
            <p>Rarity Rank #{asset[index].rarityScoreRank}</p>
          )}
          <div className='asset-price'>
            {asset[index].currentPriceUSD && (
              <>
                <span>
                  <p>Price </p>
                  <CryptoIcon token={'USD'} />
                  <small>
                    {asset[index]?.currentPriceUSD?.toLocaleString()}
                  </small>
                </span>
              </>
            )}
            {/* {asset[index].currentPrice && (
              <>
                <span>
                  <p>Price </p>
                  <CryptoIcon token={'ETH'} />
                  <small>{asset[index].currentPrice}</small>
                </span>
              </>
            )} */}
            {asset[index].lastSalePrice && (
              <span>
                <small>Last </small>
                <div className='last-price'>
                  {asset[index]?.lastSale?.payment_token?.symbol && (
                    <CryptoIcon
                      token={asset[index]?.lastSale?.payment_token?.symbol}
                    />
                  )}
                  <small> {asset[index].lastSalePrice.toLocaleString()}</small>
                </div>
              </span>
            )}
          </div>
        </section>
      </article>
    </Link>
  );
};

export default CollectionAssetCard;
