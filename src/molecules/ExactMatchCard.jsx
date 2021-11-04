import React, { useEffect, useState } from 'react';

import { FaEthereum } from 'react-icons/fa';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ImageTypeDetect from './ImageTypeDetect';
import { Api } from '../services/api';

const ExactMatchCard = ({ results, className, location, isOpen, ...props }) => {
  const [assetScore, setAssetScore] = useState(null);

  const hasExtraClasess = className ? className : '';

  const resultsHastExactMatch =
    !results.status && results.results.filter((item) => item.meta.isExact)[0];

  console.log(resultsHastExactMatch);

  const api = new Api();

  useEffect(() => {
    if (resultsHastExactMatch) {
      if (resultsHastExactMatch.meta.index === 'assets') {
        const address =
          resultsHastExactMatch?.value?.contractAddress ||
          resultsHastExactMatch.value.asset_contract.address;
        const tokenId =
          resultsHastExactMatch?.value?.tokenId ||
          resultsHastExactMatch.value.token_id;
        const getAssetScore = async () => {
          const res = await api.assets.score(address, tokenId);
          console.log(res);
          setAssetScore(res);
        };

        getAssetScore();
      }
    }

    return () => setAssetScore(null);
  }, []);

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
                    : resultsHastExactMatch.value?.image_preview_url ||
                      resultsHastExactMatch.value.imageSmall
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
                  <p>{resultsHastExactMatch.value.traits.length}</p>
                </div>

                {assetScore && (
                  <>
                    {assetScore.rarityScore ? (
                      <div className='stat'>
                        <p>Rarity Score: </p>
                        <p>
                          {' '}
                          {assetScore.rarityScore.toString().substring(0, 8)}
                        </p>
                      </div>
                    ) : null}
                    {assetScore.avgTraitRarity ? (
                      <div className='stat'>
                        <p>Avg Trait Rarity: </p>
                        <p>
                          {' '}
                          {assetScore.avgTraitRarity.toString().substring(0, 8)}
                        </p>
                      </div>
                    ) : null}
                    {assetScore.statisticalRarity ? (
                      <div className='stat'>
                        <p>Statistical Rarity: </p>
                        <p>
                          {' '}
                          {assetScore.statisticalRarity
                            .toString()
                            .substring(0, 8)}
                        </p>
                      </div>
                    ) : null}
                    {assetScore.singleTraitRarity ? (
                      <div className='stat'>
                        <p>Single Trait Rarity: </p>
                        <p>
                          {' '}
                          {assetScore.singleTraitRarity
                            .toString()
                            .substring(0, 8)}
                        </p>
                      </div>
                    ) : null}
                  </>
                )}
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
