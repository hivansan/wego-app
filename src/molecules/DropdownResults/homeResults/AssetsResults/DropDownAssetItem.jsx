import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import ImageTypeDetect from '../../../ImageTypeDetect';
import moment from 'moment';

import { Api } from '../../../../services/api';

const DropDownAssetItem = ({ asset, location, isOpen }) => {
  const [assetScore, setAssetScore] = useState(null);
  const api = new Api();

  useEffect(() => {
    const getAssetScore = async () => {
      const address = asset.contractAddress
        ? asset.contractAddress
        : asset.asset_contract.address;

      const tokenId = asset.tokenId ? asset.tokenId : asset.token_id;
      const res = await api.assets.score(address, tokenId);
      setAssetScore(res);
    };
    getAssetScore();

    return () => {
      setAssetScore(null);
    };
  }, []);

  return (
    <Link
      to={{
        pathname: `assets/${
          asset.contractAddress
            ? asset.contractAddress
            : asset.asset_contract.address
        }/${asset.tokenId ? asset.tokenId : asset.token_id}`,
        state: { background: location, searchResults: isOpen },
      }}
      key={asset.id}
    >
      <div className='asset'>
        <div className='asset-info-container'>
          {/* {asset.animationUrl ? (
            <img src={asset.animationUrl} alt='' />
          ) : (
            <img src={asset.} alt='' />
          )} */}
          <ImageTypeDetect
            imageURL={asset?.image_preview_url || asset.imageSmall}
            alt={asset.name}
            className='asset-img'
          />

          <div className='asset-info'>
            <p>{asset.name || asset?.tokenId || asset.token_id}</p>
          </div>
        </div>
        <div className='asset-stats'>
          {asset._lastSalePrice && (
            <small>
              Last Price Sold: <strong>${asset._lastSalePrice}</strong>
            </small>
          )}
          {assetScore && (
            <>
              {!assetScore.status && (
                <>
                  {assetScore.rarityScore ? (
                    <small>
                      Rarity Score:{' '}
                      <strong>
                        {assetScore.rarityScore.toString().substring(0, 8)}
                      </strong>
                    </small>
                  ) : null}

                  {assetScore.avgTraitRarity ? (
                    <small>
                      Average Trait Rarity:{' '}
                      <strong>
                        {assetScore.avgTraitRarity.toString().substring(0, 8) +
                          '%'}
                      </strong>
                    </small>
                  ) : null}

                  <small>
                    Total traits:
                    <strong> {asset.traits.length}</strong>
                  </small>
                </>
              )}
            </>
          )}
          {/* <small>
              Release date:{' '}
              <strong> {moment(asset.createdAt).format('ll')}</strong>
            </small> */}
        </div>
      </div>
    </Link>
  );
};

export default DropDownAssetItem;
