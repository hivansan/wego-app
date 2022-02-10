import React, { useEffect, useState } from 'react';
import * as Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';
import Store from '../stores/store';
import Modal from '../atoms/Modal';
import { FaArrowCircleLeft, FaDiscord, FaEthereum, FaLink, FaTwitter, FaYoutube } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Api } from '../services/api';
import ImageTypeDetect from './ImageTypeDetect';
import { Link } from 'react-router-dom';
import { useAccount } from '../store/selectors/useAccount';

const BuyNowButton = (props) => {
  const api = new Api();
  const { emitter, dispatcher, store } = Store;
  const [sellOrder, setSellOrder] = useState();
  const [account, setAccount] = useState(null);
  const _account = useAccount();
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(false);
  const [accept, setAccept] = useState(false);
  const [buying, setBuying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [collectionInfo, setCollectionInfo] = useState(false);
  const asset = props.asset;
  const socialBeesDiscordLinks = ["qTnnuraPuE", "V68hE9FHrU"][Math.floor(Math.random() * 2)];
  const socialBeesSlug = "social-bees-university";

  useEffect(() => {
    getOrder();
    initState();
  }, []);

  useEffect(() => {
    getCollection();
  }, [asset.slug]);

  useEffect(() => {
    if (_account && _account.account?.address !== "") {
      setAccount(_account.account);
    }
  }, [_account]);

  const initState = () => {
    setOpen(false);
    setReview(false);
    setAccept(false);
    setBuying(false);
  }

  const getCollection = async () => {
    const collection = await api.collections.findOne(asset.slug);
    setVerified(collection?.safelist_request_status === "verified");
    setCollectionInfo(collection);
  };

  const getOrder = async () => {
    try {
      let sell_order = asset?.sellOrders?.find(({ side }) => side);
      setSellOrder(sell_order);
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    initState();
  }

  const onClickBuy = () => {
    setOpen(true);
  }

  const handleReviewChange = () => {
    setReview(!review);
  }

  const handleAcceptChange = () => {
    setAccept(!accept);
  }

  const goBack = () => {
    setReview(false);
    setAccept(false);
  }

  const onBuyItem = async () => {
    setBuying(true);

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      const balance = window.web3.utils.fromWei(await window.web3.eth.getBalance(account.address));
      if (balance < asset.currentPrice) {
        toast.error("Insufficient funds", { hideProgressBar: true });
        setBuying(false);
        return;
      }
    }
    try {
      const seaport = new OpenSeaPort(window.web3.currentProvider, {
        networkName: Network.Main,
        apiKey: process.env.REACT_APP_OPENSEA_API_KEY
      });

      const order = await seaport.api.getOrder({
        asset_contract_address: props.tokenAddress,
        side: OrderSide.Sell,
        token_id: props.tokenId,
        order_by: 'created_date',
        order_direction: 'desc',
        bundled: 'false',
        include_bundled: 'false',
        include_invalid: 'false',
      });

      const transactionHash = await seaport.fulfillOrder({
        order,
        accountAddress: account.address,
      });
      toast.success("Order Completed", { hideProgressBar: true });
      toast.success("This item is yours", { hideProgressBar: true });
      initState();
      setSellOrder(null);
    } catch (error) {
      toast.error(error.message, { hideProgressBar: true });
      setBuying(false);
    }
  };

  return (
    <div>
      {account ? (
        sellOrder ? (
          <button
            className='btn buy-now-btn'
            type='button'
            disabled={buying}
            onClick={onClickBuy}
          >
            {buying ? 'Complete in metamask ...' : 'Buy now'}
          </button>
        ) : (
          <div className='buy-now-message'>This item is not for sale</div>
        )
      ) : <div className='buy-now-message'>Connect your wallet first</div>}
      <Modal
        open={open}
        onClose={onClose}
        modalStyles={'asset-detail-modal-container'}
        bodyStyles='buy-now-modal-body'
        isLoading={true}
      >
        <>
          <div className='buy-now-modal-info-container'>
            <div className='buy-now-modal-info'>
              <header className='buy-now-modal-info-header'>
                {(review || verified) ?
                  (<>
                    {!verified && <span className='buy-now-back-btn'><FaArrowCircleLeft size={20} onClick={goBack} /></span>}
                    <h4>Complete checkout</h4>
                  </>) :
                  (<>
                    <h4>This is an unreviewed collection</h4>
                  </>
                  )}
              </header>
              {(review || verified) ?
                (<>
                  <div className="checkout-content">
                    <div className='checkout-detail'>
                      <small>Item</small>
                      <small>Subtotal</small>
                    </div>
                    <div className='checkout-detail'>
                      <small>
                        <ImageTypeDetect
                          imageURL={asset?.imageSmall}
                          alt={asset?.name}
                          className='checkout-img'
                        />

                        <div className='checkout-info'>
                          <span>{collectionInfo.name}</span>
                          <p>{asset?.name}</p>
                        </div>
                      </small>
                      <small><FaEthereum size={15} /> {asset?.currentPrice}</small>
                    </div>
                    <div className='checkout-detail'>
                      <small>Total</small>
                      <small><FaEthereum size={15} /> {asset?.currentPrice}</small>
                    </div>
                    <div className='checkout-check'>
                      <input type="checkbox" checked={accept} onChange={handleAcceptChange} />
                      By checking this box, I agree to OpenSea's
                      <a href="https://opensea.io/tos" target="_blank" rel="noreferrer"> Terms of Service </a>
                      and WEGO's <Link to='/terms' target="_blank">Terms of Use</Link>
                    </div>
                    <div className='checkout-btn'>
                      <button
                        className='btn buy-now-btn'
                        type='button'
                        disabled={!accept || buying}
                        onClick={onBuyItem}
                      >
                        {buying ? 'Complete in metamask ...' : 'Confirm checkout'}
                      </button>
                    </div>
                  </div>
                </>) :
                (<>
                  <div className='buy-now-info'>
                    <div>Review this information to ensure it’s what you want to buy. </div>
                  </div>
                  <div className="buy-now-content">
                    <div className='buy-now-details'>
                      <span> Collection name </span>
                      <small> <a href={`https://opensea.io/collection/${collectionInfo?.slug}`}>{collectionInfo?.name}</a> </small>
                    </div>
                    <div className='buy-now-details'>
                      <span> Creator </span>
                      <small><a href={`https://opensea.io/${asset?.creator?.user?.username}`}>{asset?.creator?.user?.username}</a></small>
                    </div>
                    <div className='buy-now-details'>
                      <span> Total sales</span>
                      <small>{`${collectionInfo?.stats?.totalSales} sales`}</small>
                    </div>
                    <div className='buy-now-details'>
                      <span> Total volume</span>
                      <small><FaEthereum size={15} /> {collectionInfo?.stats?.totalVolume.toFixed(3)} </small>
                    </div>
                    <div className='buy-now-details'>
                      <span> Social links</span>
                      <small>
                        {collectionInfo.website && (
                          <a className='social-link'
                            href={collectionInfo.website} target='_blank' rel='noreferrer'>
                            <FaLink size={30} />
                          </a>
                        )}
                        {(collectionInfo.discord || collectionInfo.slug === socialBeesSlug) && (
                          <a className='social-link'
                            href={collectionInfo.slug === socialBeesSlug ? `https://discord.gg/${socialBeesDiscordLinks}` : collectionInfo.discord}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <FaDiscord size={30} />
                          </a>
                        )}
                        {(collectionInfo.twitter || collectionInfo.slug === socialBeesSlug) && (
                          <a className='social-link'
                            href={`https://twitter.com/${collectionInfo.slug === socialBeesSlug ? "Crypto_Swarm" : collectionInfo.twitter}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <FaTwitter size={30} />
                          </a>
                        )}
                        {collectionInfo.slug === socialBeesSlug && (
                          <a className='social-link'
                            href="https://www.youtube.com/c/BeesSocialTV"
                            target='_blank'
                            rel='noreferrer'
                          >
                            <FaYoutube size={30} />
                          </a>
                        )}
                      </small>
                    </div>
                    <div className='buy-now-details'>
                      <span> Contract address</span>
                      <small><a href={`https://etherscan.io/address/${asset?.contractAddress}`}>
                        {`${asset.contractAddress.substr(0, 6)}...${asset?.contractAddress.substr(asset?.contractAddress.length - 4)}`}
                      </a>
                      </small>
                    </div>
                    <div className='buy-now-details'>
                      <span> Total items</span>
                      <small>{`${collectionInfo?.stats?.count} items`}</small>
                    </div>
                    <div className='buy-now-details'>
                      <span> Created date</span>
                      <small>{asset.createdAt.split('T')[0]}</small>
                    </div>
                    <div className='buy-now-check'>
                      <input type="checkbox" checked={review} onChange={handleReviewChange} />
                      I understand that OpenSea has not reviewed this collection
                      and blockchain transactions are irreversible.
                    </div>
                  </div>
                </>)
              }
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default BuyNowButton;
