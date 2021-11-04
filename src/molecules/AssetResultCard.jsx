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
                  {/* <small>{asset.tokenId}</small> */}
                </Link>
              </div>
            </div>
            <div className='asset-card-info-stats'>
              {asset._lastSalePrice && (
                <p>
                  Last Price Sold:{' '}
                  <strong>${asset._lastSalePrice.toLocaleString()}</strong>
                </p>
              )}
              <p>
                Total traits: <strong>{asset?.traits?.length || 0}</strong>
              </p>

              {asset.rarityScore ? (
                <p>
                  Rarity Score:{' '}
                  <strong>
                    {asset.rarityScore.toString().substring(0, 8)}
                  </strong>
                </p>
              ) : null}

              {asset.avgTraitRarity ? (
                <p>
                  Average Trait Rarity:{' '}
                  <strong>
                    {asset.avgTraitRarity.toString().substring(0, 8) + '%'}
                  </strong>
                </p>
              ) : null}
              {asset.statisticalRarity ? (
                <p>
                  Statistical Rarity:{' '}
                  <strong>
                    {asset.statisticalRarity.toString().substring(0, 10) + '%'}
                  </strong>
                </p>
              ) : null}
              {asset.singleTraitRarity ? (
                <p>
                  Single Trait Rarity:{' '}
                  <strong>
                    {asset.singleTraitRarity.toString().substring(0, 8) + '%'}
                  </strong>
                </p>
              ) : null}
            </div>
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
