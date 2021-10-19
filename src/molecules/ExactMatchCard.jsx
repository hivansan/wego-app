import React from 'react';

import { FaEthereum } from 'react-icons/fa';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ImageTypeDetect from './ImageTypeDetect';

const ExactMatchCard = ({ results, className, location, isOpen, ...props }) => {
  const hasExtraClasess = className ? className : '';

  const resultsHastExactMatch = results.results.filter(
    (item) => Math.round(item.meta.score) >= 35
  )[0];

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
                    : resultsHastExactMatch.value.image_preview_url
                    ? resultsHastExactMatch.value.image_preview_url
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
              Date added :{' '}
              {moment(resultsHastExactMatch.value.createdAt).format('ll')}
            </div>
            {resultsHastExactMatch.meta.index === 'collections' ? (
              <div className='stats'>
                <div className='stat'>
                  <p>ETH Total volume</p>
                  <p>
                    {resultsHastExactMatch.value.totalVolume ||
                      resultsHastExactMatch.value.stats.totalVolume
                        .toString()
                        .substring(0, 8)}
                    <FaEthereum size={15} />
                  </p>
                </div>
                <div className='stat'>
                  <p>Owners</p>
                  <p>
                    {resultsHastExactMatch.value.numOwners ||
                      resultsHastExactMatch.value.stats.numOwners}
                  </p>
                </div>
                <div className='stat'>
                  <p>7 day volume</p>
                  <p>
                    {resultsHastExactMatch.value.sevenDayVolume ||
                      resultsHastExactMatch.value.stats.sevenDayVolume
                        .toString()
                        .substring(0, 8)}{' '}
                    <FaEthereum size={15} />
                  </p>
                </div>
                <div className='stat'>
                  <p>Total Items</p>
                  <p>
                    {resultsHastExactMatch.value.totalSupply ||
                      resultsHastExactMatch.value.stats.totalSupply}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h5 className='text-center'>Traits</h5>
                <div className='stats'>
                  {resultsHastExactMatch.value.traits
                    .filter((e, i) => i < 4)
                    .map((trait) => (
                      <div className='stat ' key={trait.value}>
                        <p>{trait.trait_type}</p>
                        <p>{trait.value}</p>
                      </div>
                    ))}
                </div>
              </>
            )}
            {/* <div className='community-trust'></div> */}
          </div>
        </Link>
      )}
    </>
  );
};

export default ExactMatchCard;

{
  /* <small>Community trust(781 votes)</small> */
}
{
  /* <div className='reactions'>
        <div className='reaction'>
          <AiFillLike size={20} />
          <small>{resultsHastExactMatch.likes}</small>
        </div>
        <div className='reaction'>
          <AiFillDislike size={20} />
          <small>{resultsHastExactMatch.disLikes}</small>
        </div>
      </div> */
}
