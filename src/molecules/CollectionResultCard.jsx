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
      const { results } = await api.assets.find(collection.slug, 3, 0);
      setAssets(results);
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
                Owners:{' '}
                <strong>
                  {collection?.stats?.numOwners || collection.numOwners}
                </strong>
              </p>
              <p>
                Total items:{' '}
                <strong>
                  {collection?.stats?.totalSupply || collection.totalSupply}
                </strong>
              </p>
              <p>
                12 Total Sales:
                <strong>
                  {' '}
                  {collection?.stats?.totalSales || collection.totalSales}
                </strong>
              </p>
              <p>
                7 day volume:
                <strong>
                  {' '}
                  {collection?.stats?.sevenDayVolume ||
                    collection.sevenDayVolume}
                  <FaEthereum size={15} />
                </strong>
              </p>
              <p>
                Total Volume:
                <strong>
                  {' '}
                  {collection?.stats?.totalVolume || collection.totalVolume}
                  <FaEthereum size={15} />
                </strong>
              </p>
              <p>
                Floor Price:
                <strong>
                  {' '}
                  {collection?.stats?.floorPrice || collection.floorPrice}
                </strong>
              </p>
            </div>
          </div>
        </div>
        <div className='collection-result-card-s'>
          <div className='assets'>
            {assets?.length > 0 && <p>Assets</p>}
            <div className='assets-container'>
              {assets?.length > 0 && (
                <>
                  {assets.map((asset, i) => {
                    const address =
                      asset?.contractAddress || asset.asset_contract.address;

                    const tokenId = asset?.tokenId || asset.token_id;
                    return (
                      <div className='asset' key={i}>
                        <Link
                          to={{
                            pathname: `assets/${address}/${tokenId}`,
                            state: { background: location },
                          }}
                        >
                          <ImageTypeDetect
                            imageURL={asset.imageSmall}
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
