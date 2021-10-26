import React, { useState, useEffect } from 'react';

import Modal from '../atoms/Modal';
import DarkPrimaryButton from '../atoms/darkPrimaryButton';
import LightPrimaryButton from '../atoms/lightPrimaryButton';
import ImageTypeDetect from './ImageTypeDetect';
import { Api } from '../services/api';
import { useLocation, useHistory, useParams } from 'react-router-dom';

const AssetDetailModal = ({ setFooter }) => {
  const [open, setOpen] = useState(true);

  const [asset, setAssetScore] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const { address, tokenId } = useParams();
  const api = new Api();

  const getAssetScore = async () => {
    const res = await api.assets.score(address, tokenId);
    console.log(res);
    setAssetScore(res);
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
    if (location.state) {
      localStorage.setItem('sR', location.state.searchResults);
    }

    if (!location.key) {
      setFooter(location.pathname);
    }
    getAssetScore();
  }, []);

  return (
    <Modal
      open={open}
      onClose={back}
      modalStyles={'asset-detail-modal-container'}
      bodyStyles='asset-detail-modal-body'
      isLoading={asset}
    >
      {asset && (
        <>
          {asset.status ? (
            <small>not found</small>
          ) : (
            <>
              <div className='asset-detail-modal-info-container'>
                <div className='asset-detail-modal-info'>
                  <header className='asset-detail-modal-info-header'>
                    <p>
                      {asset.name ? (
                        <>{asset.name}</>
                      ) : (
                        <>
                          {' '}
                          {asset.slug
                            .split('-')
                            .map((a) => a.charAt(0).toUpperCase() + a.substr(1))
                            .join(' ')}
                        </>
                      )}
                    </p>
                  </header>
                  {asset.animationUrl ? (
                    <div className='img-wrapper'>
                      <ImageTypeDetect
                        className='animation'
                        imageURL={asset.animationUrl}
                        alt={asset.name}
                        bigImage={true}
                        bigVideo={true}
                        onLoading={
                          <ImageTypeDetect
                            imageURL={asset.imageSmall}
                            alt={asset.name}
                            className='img'
                          />
                        }
                      />
                    </div>
                  ) : (
                    <>
                      {asset.imageBig ? (
                        <a
                          href={asset.imageBig}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <div className='img-wrapper'>
                            <ImageTypeDetect
                              className='img'
                              imageURL={asset.imageBig}
                              alt={asset.name}
                              bigImage={true}
                              bigVideo={true}
                              onLoading={
                                <ImageTypeDetect
                                  imageURL={asset.imageSmall}
                                  alt={asset.name}
                                  className='img'
                                />
                              }
                            />
                          </div>
                        </a>
                      ) : (
                        <div className='img-wrapper'>
                          <ImageTypeDetect
                            className='img'
                            imageURL={asset.imageSmall}
                            alt={asset.name}
                            bigImage={true}
                            bigVideo={true}
                            onLoading={
                              <div className='img-loading'>
                                <div
                                  className='spinner-border'
                                  role='status'
                                ></div>
                              </div>
                            }
                          />
                        </div>
                      )}
                    </>
                  )}

                  <p>
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

                  <a
                    href={`https://opensea.io/assets/${asset.contractAddress}/${asset.tokenId}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='asset-modal-opensea'>
                      <img
                        src='https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png'
                        alt='open sea logo'
                      />
                      <p>View on OpenSea</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className='asset-detail-modal-stats'>
                <div className='rarity-score'>
                  <div className='rarity-score-title'>Rarity Score</div>
                  <div className='rarity-score-content'>
                    {asset?.rarityScore?.toString()?.substring(0, 6) || 0}
                  </div>
                </div>

                {/* <div className='asset-detail-modal-stats-filters-sorts'>
                  <DarkPrimaryButton>Sorted Traits</DarkPrimaryButton>
                  <LightPrimaryButton>By Category</LightPrimaryButton>
                </div> */}

                <div className='asset-detail-modal-stats-filters-container'>
                  {/* <ul>
                    <li>Rarity Score</li>
                    <li>Highest Floor Price</li>
                    <li>Name</li>
                  </ul> */}

                  {/* asset traits */}

                  <div className='asset-detail-modal-stats-filters'>
                    {asset &&
                      asset.traits.map((trait) => (
                        <div
                          className='asset-detail-modal-stats-filter'
                          key={trait.trait_type}
                        >
                          <div className='asset-detail-filter-header'>
                            <small>{trait.trait_type}</small>
                            <div className='asset-detail-filter-header-n'>
                              <small>
                                {trait?.traitScore?.toString()?.substr(0, 6)}
                              </small>
                            </div>
                          </div>
                          <div className='asset-detail-filter-attribute'>
                            <small>{trait.value}</small>
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
        </>
      )}
    </Modal>
  );
};

export default AssetDetailModal;
