// import React, { useEffect, useState } from 'react';

import { FaEthereum } from 'react-icons/fa';
// import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ImageTypeDetect from './ImageTypeDetect';
// import { Api } from '../services/api';

const ExactMatchCard = ({ results, className, location, isOpen, ...props }) => {
  const hasExtraClasess = className ? className : '';

  const resultsHastExactMatch =
    !results.status && results.results.filter((item) => item.meta.isExact)[0];

  return (
    <>
      {resultsHastExactMatch && (
        <Link
          to={
            resultsHastExactMatch.meta.index === 'collections'
              ? { pathname: `collection/${resultsHastExactMatch.value.slug}` }
              : resultsHastExactMatch.value.asset_contract
                ? {
                  pathname: `assets/${resultsHastExactMatch.value.asset_contract.address}/${resultsHastExactMatch.value.token_id}`,
                  state: { background: location, searchResults: isOpen },
                }
                : {
                  pathname: `assets/${resultsHastExactMatch.value.contractAddress}/${resultsHastExactMatch.value.tokenId}`,
                  state: { background: location, searchResults: isOpen },
                }
          }
        >
          <div {...props} className={`${hasExtraClasess} exact-match-card`}>
            <header>Exact Match!</header>
            <div className='exact-match-card-info-container'>
              <ImageTypeDetect
                imageURL={
                  resultsHastExactMatch.meta.index === 'collections'
                    ? resultsHastExactMatch.value.imgMain
                    : resultsHastExactMatch.value.imageSmall
                }
                className='exact-match-img'
                alt={resultsHastExactMatch.value.name}
              />
              <div className='exact-match-card-info'>
                <p>{resultsHastExactMatch.value.name}</p>
                <div className='wego-score'> </div>
              </div>
            </div>
            <div className='date-add'>
              Last updated :{' '}
              {moment(resultsHastExactMatch.value.updatedAt).format('ll')}
            </div>
            {resultsHastExactMatch.meta.index === 'collections' ? (
              <div className='stats'>
                <div className='stat'>
                  <p>ETH Total volume</p>
                  <p>
                    {resultsHastExactMatch?.value?.totalVolume ||
                      resultsHastExactMatch.value.stats.totalVolume
                        .toString()
                        .substring(0, 8) ||
                      0}
                    <FaEthereum size={15} />
                  </p>
                </div>
                <div className='stat'>
                  <p>Owners</p>
                  <p>
                    {resultsHastExactMatch?.value?.numOwners ||
                      resultsHastExactMatch.value.stats.numOwners ||
                      0}
                  </p>
                </div>
                <div className='stat'>
                  <p>7 day volume</p>
                  <p>
                    {resultsHastExactMatch?.value?.sevenDayVolume ||
                      resultsHastExactMatch?.value?.stats?.sevenDayVolume
                        .toString()
                        .substring(0, 8) ||
                      0}{' '}
                    <FaEthereum size={15} />
                  </p>
                </div>
                <div className='stat'>
                  <p>Total Items</p>
                  <p>
                    {resultsHastExactMatch?.value?.totalSupply ||
                      resultsHastExactMatch?.value?.stats?.totalSupply ||
                      0}
                  </p>
                </div>
              </div>
            ) : (
              <div className='stats'>
                {resultsHastExactMatch.value._lastSalePrice && (
                  <div className='stat'>
                    <p>Las sold</p>
                    <p>{resultsHastExactMatch.value._lastSalePrice}</p>
                  </div>
                )}

                <div className='stat'>
                  <p>Total Traits</p>
                  <p>{resultsHastExactMatch.value.traitsCount}</p>
                </div>

                {resultsHastExactMatch.value.rarityScore ? (
                  <div className='stat'>
                    <p>Rarity Score: </p>
                    <p>
                      {' '}
                      {resultsHastExactMatch.value.rarityScore
                        .toString()
                        .substring(0, 8)}
                    </p>
                  </div>
                ) : null}
                {resultsHastExactMatch.value.avgTraitRarity ? (
                  <div className='stat'>
                    <p>Avg Trait Rarity: </p>
                    <p>
                      {' '}
                      {resultsHastExactMatch.value.avgTraitRarity
                        .toString()
                        .substring(0, 8)}
                    </p>
                  </div>
                ) : null}
                {resultsHastExactMatch.value.statisticalRarity ? (
                  <div className='stat'>
                    <p>Statistical Rarity: </p>
                    <p>
                      {' '}
                      {resultsHastExactMatch.value.statisticalRarity
                        .toString()
                        .substring(0, 8)}
                    </p>
                  </div>
                ) : null}
                {resultsHastExactMatch.value.singleTraitRarity ? (
                  <div className='stat'>
                    <p>Single Trait Rarity: </p>
                    <p>
                      {' '}
                      {resultsHastExactMatch.value.singleTraitRarity
                        .toString()
                        .substring(0, 8)}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
            {/* <div className='community-trust'></div> */}
          </div>
        </Link>
      )}
    </>
  );
};

export default ExactMatchCard;