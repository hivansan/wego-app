import React, { useEffect, useState } from 'react';

import ImageTypeDetect from './ImageTypeDetect';
import { FaEthereum } from 'react-icons/fa';
import { Api } from '../services/api';

import { Link } from 'react-router-dom';
import moment from 'moment';

const AssetResultCard = ({ result, location }) => {
  const { value: asset } = result;

  const [assetScore, setAssetScore] = useState(null);

  const api = new Api();

  useEffect(() => {
    const getAssetScore = async () => {
      const address = asset.contractAddress
        ? asset.contractAddress
        : asset.asset_contract.address;

      const tokenId = asset.tokenId ? asset.tokenId : asset.token_id;
      const res = await api.assets.score(address, tokenId);
      console.log(res);
      setAssetScore(res);
    };
    getAssetScore();

    return () => {
      setAssetScore(null);
    };
  }, []);

  return (
    <div className='asset-result-card'>
      <header>Asset</header>
      <div className='asset-result-card-body'>
        <div className='asset-info'>
          <div className='asset-result-card-info-container'>
            <div className='asset-result-card-info'>
              {asset.image_preview_url ? (
                <ImageTypeDetect
                  imageURL={asset.image_preview_url}
                  alt={asset.name}
                  className='asset-result-img'
                />
              ) : (
                <img
                  src='https://i.stack.imgur.com/y9DpT.jpg'
                  alt=''
                  className='asset-result-img'
                />
              )}
              <div className='info'>
                <Link
                  to={{
                    pathname: `assets/${
                      asset.contractAddress
                        ? asset.contractAddress
                        : asset.asset_contract.address
                    }/${asset.tokenId ? asset.tokenId : asset.token_id}`,
                    state: { background: location },
                  }}
                >
                  <p>{asset.name}</p>
                </Link>
              </div>
            </div>
            {assetScore && (
              <div className='asset-card-info-stats'>
                <p>
                  Rarity Score:{' '}
                  <strong>
                    {assetScore.rarityScore
                      ? assetScore.rarityScore.toString().substring(0, 8)
                      : '0'}
                  </strong>
                </p>
                <p>
                  Average Trait Rarity:{' '}
                  <strong>
                    {assetScore.avgTraitRarity
                      ? assetScore.avgTraitRarity.toString().substring(0, 8) +
                        '%'
                      : '0'}
                  </strong>
                </p>
                <p>
                  Statistical Rarity:{' '}
                  <strong>
                    {assetScore.statisticalRarity
                      ? assetScore.statisticalRarity
                          .toString()
                          .substring(0, 10) + '%'
                      : '0'}
                  </strong>
                </p>
                <p>
                  Single Trait Rarity:{' '}
                  <strong>
                    {assetScore.singleTraitRarity
                      ? assetScore.singleTraitRarity
                          .toString()
                          .substring(0, 8) + '%'
                      : '0'}
                  </strong>
                </p>
                <p>
                  Total traits: <strong>{assetScore.traits.length}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='asset-result-card-s'>
          <div className='asset-preview'>
            <div className='asset'>
              <p>Preview</p>
              <Link
                to={{
                  pathname: `assets/${
                    asset.contractAddress
                      ? asset.contractAddress
                      : asset.asset_contract.address
                  }/${asset.tokenId ? asset.tokenId : asset.token_id}`,
                  state: { background: location },
                }}
              >
                {asset.image_preview_url ? (
                  <ImageTypeDetect
                    imageURL={asset.image_preview_url}
                    alt={asset.name}
                    className='asset-preview-img'
                  />
                ) : (
                  <img
                    src='https://i.stack.imgur.com/y9DpT.jpg'
                    alt=''
                    className='asset-preview-img'
                  />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetResultCard;
