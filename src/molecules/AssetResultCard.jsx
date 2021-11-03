import React, { useEffect, useState, useRef } from 'react';

import ImageTypeDetect from './ImageTypeDetect';
import { FaEthereum } from 'react-icons/fa';
import { Api } from '../services/api';

import { Link } from 'react-router-dom';
import moment from 'moment';

const AssetResultCard = ({ result, location }) => {
  const { value: asset } = result;

  const [assetScore, setAssetScore] = useState(null);
  const [didMount, setDidMount] = useState(false);
  const api = new Api();

  const address = asset?.contractAddress || asset.asset_contract.address;

  const tokenId = asset?.tokenId || asset.token_id;
  useEffect(() => {
    setDidMount(true);

    const getAssetScore = async () => {
      const res = await api.assets.score(address, tokenId);
      setAssetScore(res);
    };

    getAssetScore();
    return () => {
      setDidMount(false);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <div className='asset-result-card'>
      <header>Asset</header>
      <div className='asset-result-card-body'>
        <div className='asset-info'>
          <div className='asset-result-card-info-container'>
            <div className='asset-result-card-info'>
              <ImageTypeDetect
                imageURL={asset?.image_preview_url || asset.imageSmall}
                alt={asset.name}
                className='asset-result-img'
              />

              <div className='info'>
                <Link
                  to={{
                    pathname: `assets/${address}/${tokenId}`,
                    state: { background: location },
                  }}
                >
                  <p>{asset.name}</p>
                </Link>
              </div>
            </div>
            {assetScore && (
              <div className='asset-card-info-stats'>
                {asset._lastSalePrice && (
                  <p>
                    Last Price Sold:{' '}
                    <strong>{asset._lastSalePrice.toLocaleString()}$</strong>
                  </p>
                )}
                {!assetScore.status && (
                  <>
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
                          ? assetScore.avgTraitRarity
                              .toString()
                              .substring(0, 8) + '%'
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
                      Total traits: <strong>{asset.traits.length}</strong>
                    </p>
                  </>
                )}
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
                  pathname: `assets/${address}/${tokenId}`,
                  state: { background: location },
                }}
              >
                <ImageTypeDetect
                  imageURL={asset?.image_preview_url || asset.imageSmall}
                  alt={asset.name}
                  className='asset-preview-img'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetResultCard;
