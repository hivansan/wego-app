import React, { useEffect, useState } from 'react';
import * as Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';
import { infuraProvider } from '../config/example.config';
import { CONNECTION_CONNECTED } from '../constants/constants';
import Store from '../stores/store';

const { emitter, dispatcher, store } = Store;

const BuyNowButton = (props) => {
  console.log(props)
  const [loaders, setLoaders] = useState({
    buying: false,
    makingOffer: false,
  });
  const [nft, setNft] = useState({});
  const [sellOrder, setSellOrder] = useState();
  const [fromOptions, setFromOptions] = useState([]);
  const [account, setAccount] = useState('');
  const provider = new Web3.providers.HttpProvider(infuraProvider);

  useEffect(() => {
    getAsset();
    emitter.on(CONNECTION_CONNECTED, onConnected);
    let account = store.getStore('account');
    setAccount(account);
    return () => {
      emitter.removeListener(CONNECTION_CONNECTED, onConnected);
    };
  }, [props.id]);

  const onConnected = () => {
    let account = store.getStore('account');
    setAccount(account);
  };

  const setLoader = (loaderKey) => {
    let l = { ...loaders };
    l[loaderKey] = true;
    setLoaders(l);
  };

  const freeLoader = (loaderKey) => {
    let l = { ...loaders };
    if (!loaderKey) {
      for (const key of Object.keys(loaders)) l[key] = false;
      return setLoaders(l);
    }
    l[loaderKey] = false;
    setLoaders(l);
  };

  const getAsset = async () => {
    try {
      const seaport = new OpenSeaPort(provider, {
        networkName: Network.Main,
      });
      console.log(props);
      const { tokenAddress, tokenId } = props?.match.params;

      const asset = await seaport.api.get(
        `/api/v1/asset/${tokenAddress}/${tokenId}`
      );
      setNft(asset);
      setFromOptions(
        asset.collection.payment_tokens.filter(
          ({ address }) =>
            address !== '0x0000000000000000000000000000000000000000'
        )
      );

      let sell_order = asset?.orders?.find(({ side }) => side);
      setSellOrder(sell_order);

    } catch (error) {
      console.log(error);
    }
  };

  const onBuyItem = async () => {
    setLoader('buying');

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
    try {
      const seaport = new OpenSeaPort(window.web3.currentProvider, {
        networkName: Network.Main,
      });

      const order = await seaport.api.getOrder({
        asset_contract_address: nft.asset_contract.address,
        side: OrderSide.Sell,
        token_id: nft.token_id,
        order_by: 'created_date',
        order_direction: 'desc',
        bundled: 'false',
        include_bundled: 'false',
        include_invalid: 'false',
      });

      // console.log(account);
      const transactionHash = await seaport.fulfillOrder({
        order,
        accountAddress: account.address,
      });
      console.log(transactionHash);
      freeLoader('buying');
    } catch (error) {
      freeLoader('buying');
      console.log(error);
    }
  };

  return (
    <div>
      {sellOrder ? (
        <button
          className='btn btn-outline-orange'
          type='button'
          disabled={loaders.buying || !sellOrder}
          onClick={onBuyItem}
        >
          {loaders.buying ? 'complete in metamask ...' : 'Buy now'}
        </button>
      ) : (
        <div>This item is not for sale</div>
      )}
    </div>
  );
};

export default BuyNowButton;
