import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
  filters
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

  const pathstate = {};
  if (filters)
    pathstate.filters = filters


    
  return (
    <Link
      key={asset[index].id}
      to={{
        pathname: `/assets/${asset[index].asset_contract?.address || asset[index].contractAddress
          }/${asset[index].tokenId}`,
        state: { background: location, ...pathstate },
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
          ) : collectionImg ? (
            <ImageTypeDetect
              imageURL={collectionImg}
              alt={asset[index].slug}
              className='img'
            />
          ) : ''}
        </section>
        <section className='asset-card-info'>
          {asset[index].rarityScoreRank && (
            <p>Rarity Rank #{asset[index].rarityScoreRank}</p>
          )}
          <div className='asset-price'>
            {asset[index].currentPrice && (
              <>
                <span>
                  <small>Price</small>
                  <div className='last-price'>
                    <CryptoIcon token={asset[index]?.sellOrders?.length ? asset[index].sellOrders[0].payment_token_contract?.symbol : 'ETH'} />
                    <small>
                      {asset[index]?.currentPrice?.toLocaleString().substr(0, 10)}
                    </small>
                  </div>
                </span>
              </>
            )}

            {asset[index].lastSalePrice && (
              <>
                <span>
                  <small>Last</small>
                  <div className='last-price'>
                    {asset[index]?.lastSale?.payment_token?.symbol && (<CryptoIcon token={asset[index]?.lastSale?.payment_token?.symbol} />)}
                    <small> {asset[index].lastSalePrice.toLocaleString()}</small>
                  </div>
                </span>
                <span>
                  <small>{asset[index]?.lastSale ? 'Last sold: ' + moment(asset[index].lastSale.created_date).format('MMM D \'YY') : ''}</small>
                </span>
              </>
            )}
          </div>
        </section>
      </article>
    </Link>
  );
};

export default CollectionAssetCard;
