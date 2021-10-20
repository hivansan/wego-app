import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageTypeDetect from '../../../ImageTypeDetect';
import moment from 'moment';
import { SiEthereum } from 'react-icons/si';
import { Api } from '../../../../services/api';
const DropDownCollectionItem = ({ collection }) => {
  const [assets, setAssets] = useState(null);
  const api = new Api();

  useEffect(() => {
    const getCollectionAssets = async () => {
      const res = await api.collections.assets(collection.slug, 2, 0);
      setAssets(res);
    };
    getCollectionAssets();

    return () => {
      setAssets(null);
    };
  }, []);

  return (
    <Link
      to={{
        pathname: `collection/${collection.slug}`,
      }}
      key={collection.id}
    >
      <div className='collection'>
        <div className='collection-left'>
          <div className='collection-info'>
            <ImageTypeDetect
              imageURL={collection.imgMain}
              alt={collection.name}
              className='collection-img'
            />
            <div className='d-flex align-items-center flex-column'>
              <p className='text-start'>{collection.name}</p>

              <small>
                Release date :{' '}
                <strong>{moment(collection.createdAt).format('ll')}</strong>
              </small>
            </div>
            {/* <small>Wego Score: {collection.wegoScore}</small> */}
          </div>
          <div className='collection-stats'>
            <small>
              Total Sales:{' '}
              <strong>
                {collection.stats
                  ? collection.stats.totalSales
                  : collection.totalSales}
              </strong>
            </small>
            <small>
              Items :{' '}
              <strong>
                {collection.stats
                  ? collection.stats.totalSupply
                  : collection.totalSupply}
              </strong>
            </small>
            <small>
              Owners :{' '}
              <strong>
                {collection.stats
                  ? collection.stats.numOwners
                  : collection.numOwners}
              </strong>
            </small>
            <small>
              TotalVolume :{' '}
              <strong>
                {collection.stats
                  ? collection.stats.totalVolume
                  : collection.totalVolume}
                <SiEthereum size={15} />
              </strong>
            </small>
          </div>
        </div>
        <div className='assets-preview'>
          <p>Assets Preview</p>
          <div className='assets'>
            {assets &&
              assets.map((asset) => (
                <img src={asset.image_preview_url} alt='' key={asset.id} />
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DropDownCollectionItem;
