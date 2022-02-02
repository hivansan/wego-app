import { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from '../atoms/Modal';
import ImageTypeDetect from './ImageTypeDetect';
import { Api } from '../services/api';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import Trait from './AssetDetailModal/Trait';
import CryptoIcon from '../atoms/CryptoIcon';

const AssetDetailModal = ({ setFooter }) => {
  const [open, setOpen] = useState(true);

  const [asset, setAsset] = useState(null);
  // const [assetScore, setAssetScore] = useState(null);
  const [filters, setFilters] = useState([]);
  const [goBackPath, setGoBackPath] = useState('');
  const [collectionTraits, setCollectionTraits] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const { address, tokenId } = useParams();
  const api = new Api();

  const getAsset = async () => {
    const res = await api.assets.findOne(address, tokenId);
    console.log('ASSET::,', asset);
    setAsset(res);
  };
  // const getAssetScore = async () => {
  //   const res = await api.assets.score(address, tokenId);
  //   setAssetScore(res);
  // };

  const back = (e) => {
    e.stopPropagation();
    if (!location.key && asset) {
      return history.push(`/collection/${asset.slug}`);
    } else if (!location.key) {
      return history.push('/');
    }

    history.push(goBackPath, { filters });
    setOpen(false);
  };

  useEffect(() => {
    if (location.state) {
      localStorage.setItem('sR', location.state.searchResults);
    }

    if (!location.key) {
      setFooter(location.pathname);
    }
    getAsset();

    if (location.state) {
      setGoBackPath(location.state.background.pathname);
      setFilters(location.state?.filters || []);
      setCollectionTraits(location.state?.collectionTraits || []);
    }
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
                    {/* <p>
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
                    </p> */}

                    {asset && (
                      <a href={`/collection/${asset.slug}`}>
                        <p>{asset.slug}</p>
                      </a>
                    )}
                    <small>
                      {asset.name
                        ? asset.name.length > 36
                          ? asset.name.substring(0, 36) + '...'
                          : asset.name
                        : asset.tokenId}
                    </small>
                  </header>
                  {asset.animationUrl ? (
                    <div className='img-wrapper'>
                      <ImageTypeDetect
                        className='animation'
                        imageURL={asset.animationUrl}
                        alt={asset.name}
                        bigImage={true}
                        bigVideo={true}
                        animationFallbackURL={
                          asset.imageBig ? asset.imageBig : asset.imageSmall
                        }
                        onLoading={
                          <a
                            href={asset.imageBig}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <ImageTypeDetect
                              imageURL={asset.imageBig}
                              alt={asset.name}
                              className='img'
                              bigImage={true}
                              onLoading={
                                <ImageTypeDetect
                                  imageURL={asset.imageSmall}
                                  alt={asset.name}
                                  className='img'
                                />
                              }
                            />
                          </a>
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
                  <div className='asset-detail-info'>
                    {/* <p>#{asset?.tokenId?.substr(0, 26)}</p> */}
                    {asset.rarityScoreRank && (
                      <p>Rarity Rank #{asset.rarityScoreRank}</p>
                    )}
                    <div className='asset-price'>
                      {asset.currentPrice && (
                        <>
                          <span>
                            <p>Price</p>
                            <div className='last-price'>
                              <CryptoIcon token={asset.sellOrders?.length ? asset.sellOrders[0].payment_token_contract?.symbol : 'ETH'} />
                              <small>
                                {asset.currentPrice.toLocaleString().substr(0, 10)}
                              </small>
                            </div>
                          </span>
                        </>
                      )}
                      {asset.lastSalePrice && (
                        <>
                          <span>
                            <small>Last</small>
                            <div className='last-price'>
                              {asset?.lastSale?.payment_token?.symbol && (<CryptoIcon token={asset?.lastSale?.payment_token?.symbol || 'eth'} />)}
                              <small>
                                {asset.lastSalePrice.toLocaleString()}
                              </small>
                            </div>
                          </span>
                          <span>
                            <small>{asset?.lastSale ? 'Last sold: ' + moment(asset.lastSale.created_date).format('MMM D \'YY') : ''}</small>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {/* <p>
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
                  </p> */}

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
                      asset.traits &&
                      asset.traits
                        .sort((traitA, traitB) => { return traitB.traitScore - traitA.traitScore })
                        .map((trait, i) => (
                          <Trait
                            filters={filters}
                            setFilters={setFilters}
                            trait={trait}
                            bgFilters={location?.state?.filters || []}
                            key={i}
                            collectionTraits={collectionTraits?.find(collectionTrait => collectionTrait.value === trait.value && collectionTrait.trait_type === trait.trait_type)}
                          />
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
