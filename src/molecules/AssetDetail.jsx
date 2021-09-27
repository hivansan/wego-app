import React, { useState, useEffect } from 'react';

import Modal from '../atoms/Modal';
import DarkPrimaryButton from '../atoms/darkPrimaryButton';
import LightPrimaryButton from '../atoms/lightPrimaryButton';
import ImageTypeDetect from './ImageTypeDetect';
import { Api } from '../services/api';
import { useLocation, useHistory, useParams } from 'react-router-dom';

const AssetDetailModal = ({
  name = 'Mutant Ape Yach Club',

  dateAdded = '20 jul 2021',
  owners = 300,
  setModalLink,
  setFooter,
}) => {
  const [open, setOpen] = useState(true);
  const [asset, setAsset] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const { address, tokenId } = useParams();
  const api = new Api();

  const getAsset = async () => {
    const res = await api.assets.findOne(address, tokenId);
    console.log(res);
    setAsset(res);
  };

  const back = (e) => {
    e.stopPropagation();
    if (!location.key) {
      return history.push('/');
    }

    history.goBack();
    setOpen(false);
  };

  useEffect(() => {
    if (!location.key) {
      setFooter(location.pathname);
    }

    getAsset();
  }, []);

  console.log(asset);

  return (
    <Modal bodyStyles='asset-detail-modal-body' open={open} onClose={back}>
      {asset && (
        <>
          <div className='asset-detail-modal-info-container'>
            <div className='asset-detail-modal-info'>
              <header className='asset-detail-modal-info-header'></header>
              {asset.animationUrl ? (
                <video
                  autoPlay
                  muted
                  controls
                  controlsList='nodownload'
                  loop
                  playsInline
                  className='animation'
                >
                  <source src={asset.animationUrl} type='video/mp4' />
                </video>
              ) : (
                <>
                  {asset.imageBig ? (
                    <a href={asset.imageBig} target='_blank' rel='noreferrer'>
                      <div className='img-wrapper'>
                        <ImageTypeDetect
                          className='img'
                          imageURL={asset.imageBig}
                          alt={asset.name}
                        />
                      </div>
                    </a>
                  ) : (
                    <ImageTypeDetect
                      className='img'
                      imageURL={asset.imageSmall}
                      alt={asset.name}
                    />
                  )}
                </>
              )}

              <p>
                {asset.name
                  ? asset.name
                  : asset.slug
                      .split('-')
                      .map((a) => a.charAt(0).toUpperCase() + a.substr(1))
                      .join(' ')}

                <small>
                  #
                  {asset.tokenId.length > 8 ? (
                    <>
                      {asset.tokenId.substring(0, 8)}...
                      {asset.tokenId.substring(
                        asset.tokenId.length - 5,
                        asset.tokenId.length - 1
                      )}
                    </>
                  ) : (
                    <>{asset.tokenId}</>
                  )}
                </small>
              </p>

              <a href='/#'>
                <div className='asset-modal-opensea'>
                  <img
                    src='https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png'
                    alt='open sea logo'
                  />
                  <p>
                    View on OpenSea <strong>1ETH</strong>
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className='asset-detail-modal-stats'>
            <div className='rarity-score'>
              <div className='rarity-score-title'>Rarity Score</div>
              <div className='rarity-score-content'>
                {asset.rariScore ? asset.rariScore : '0'}
              </div>
            </div>

            <div className='asset-detail-modal-stats-filters-sorts'>
              <DarkPrimaryButton>Sorted Traits</DarkPrimaryButton>
              <LightPrimaryButton>By Category</LightPrimaryButton>
            </div>

            <div className='asset-detail-modal-stats-filters-container'>
              <ul>
                <li>Rarity Score</li>
                <li>Highest Floor Price</li>
                <li>Name</li>
              </ul>

              {/* asset traits */}

              <div className='asset-detail-modal-stats-filters'>
                {asset.traits.map((trait) => (
                  <div
                    className='asset-detail-modal-stats-filter'
                    key={trait.trait_type}
                  >
                    <div className='asset-detail-filter-header'>
                      <small>{trait.trait_type}</small>
                      <div className='asset-detail-filter-header-n'>
                        <small>0.35 ETH</small>
                        <small>+1157.41</small>
                      </div>
                    </div>
                    <div className='asset-detail-filter-attribute'>
                      <small></small>
                      <div className='asset-detail-filter-a'>
                        <p>{trait.trait_count}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default AssetDetailModal;
