import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FaEthereum } from 'react-icons/fa';
import moment from 'moment';
import { Api } from '../services/api';
import ImageTypeDetect from './ImageTypeDetect';

const CollectionResultCard = ({ result, location }) => {
  const [assets, setAssets] = useState(null);
  const api = new Api();
  const { value: collection } = result;

  useEffect(() => {
    const getCollectionAssets = async () => {
      const res = await api.collections.assets(collection.slug, 3, 0);
      setAssets(res);
    };
    getCollectionAssets();

    return () => {
      setAssets(null);
    };
  }, []);
  return (
    <div className='collection-result-card'>
      <header>Collection</header>
      <div className='collection-result-card-body'>
        <div className='collection-info'>
          <div className='collection-result-card-info-container'>
            <div className='collection-result-card-info'>
              <ImageTypeDetect
                imageURL={collection.imgMain}
                alt={collection.name}
                className='collection-result-img'
              />
              <div className='info'>
                <Link to={`collection/${collection.slug}`}>
                  <p>{collection.name}</p>
                </Link>
                <small>
                  Release date:{' '}
                  <strong>{moment(collection.createdAt).format('ll')}</strong>
                </small>
              </div>
            </div>
            <div className='card-info-stats'>
              <p>
                Owners: <strong>{collection.numOwners}</strong>
              </p>
              <p>
                Total items: <strong>{collection.totalSupply}</strong>
              </p>
              <p>
                Total Sales:
                <strong> {collection.totalSales}</strong>
              </p>
              <p>
                7 day volume:
                <strong>
                  {' '}
                  {collection.sevenDayVolume}
                  <FaEthereum size={15} />
                </strong>
              </p>
              <p>
                Total Volume:
                <strong>
                  {' '}
                  {collection.totalVolume}
                  <FaEthereum size={15} />
                </strong>
              </p>
              <p>
                Floor Price:
                <strong> {collection.floorPrice}</strong>
              </p>
            </div>
          </div>
        </div>
        <div className='collection-result-card-s'>
          <div className='assets'>
            <p>Assets</p>
            <div className='assets-container'>
              {assets && (
                <>
                  {assets.map((asset, i) => {
                    const address = asset.contractAddress
                      ? asset.contractAddress
                      : asset.asset_contract.address;

                    const tokenId = asset.tokenId
                      ? asset.tokenId
                      : asset.token_id;

                    return (
                      <div className='asset' key={i}>
                        <Link
                          to={{
                            pathname: `assets/${address}/${tokenId}`,
                            state: { background: location },
                          }}
                        >
                          <ImageTypeDetect
                            imageURL={asset.image_preview_url}
                            alt={''}
                            className='asset-img'
                          />
                        </Link>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionResultCard;
