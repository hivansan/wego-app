import React, { useEffect, useState } from 'react';

import * as Web3 from 'web3';
import { InputGroup, Dropdown, Form, Accordion, Button } from 'react-bootstrap';

import moment from 'moment';

import './nftDetails.scss';
import Store from '../stores/store';
import { infuraProvider } from '../config/example.config';
import { CONNECTION_CONNECTED } from '../constants/constants';
// import openseaGetAsset from '../utils/opensea.getAsset';

const { emitter, dispatcher, store } = Store;

const NftDetails = (props) => {
  const [asset, setAsset] = useState({});
  const [sellOrder, setSellOrder] = useState();
  const [buyOrders, setBuyOrders] = useState([]);
  const [account, setAccount] = useState('');
  const [enabledOfferForm, seteEnabledOfferForm] = useState(false);
  const [loaders, setLoaders] = useState({
    buying: false,
    makingOffer: false,
  });
  const [error, setError] = useState('');
  const [fromOptions, setFromOptions] = useState([]);
  const [fromAmount, setFromAmount] = useState('0');
  const [selectedAssetBalance, setSelectedAssetBalance] = useState(0);
  const [fromAddress, setFromAddress] = useState();
  const [fromToggleContents, setFromToggleContents] = useState('Choose');
  const [rarityScore, setRarityScore] = useState(0);

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

      const { tokenAddress, tokenId } = props.match.params;

      let asset = await seaport.api.get(
        `/api/v1/asset/${tokenAddress}/${tokenId}`
      );

      setAsset(asset);

      console.log(asset.collection.payment_tokens[1].address);
      console.log(asset);

      setFromOptions(
        asset.collection.payment_tokens.filter(
          ({ address }) =>
            address !== '0x0000000000000000000000000000000000000000'
        )
      );
      // onSelectAssetIn(asset.collection.payment_tokens[1].address);

      let sell_order = asset?.orders?.find(({ side }) => side);
      let buy_orders = asset?.orders?.filter(({ side }) => !side);
      console.log(asset);
      console.log(sell_order);
      console.log(buy_orders);
      setSellOrder(sell_order);
      setBuyOrders(buy_orders);

      // if (asset.orders && asset.orders.length) {
      //   console.log(asset.orders[0].payment_token_contract.usd_price);
      //   console.log(`${asset.orders[0].currentPrice}` / 1000000000000000000);
      //   console.log(
      //     (`${asset.orders[0].currentPrice}` / 1000000000000000000) *
      //       asset.orders[0].payment_token_contract.usd_price
      //   );
      // }
    } catch (error) {
      console.log(error);
      // throw error;
    }
  };

  const onMakeOffer = async () => {
    setLoader('makingOffer');
    console.log(asset);
    const { asset_contract } = asset;
    const { tokenAddress, tokenId } = props.match.params;
    const account = store.getStore('account');
    console.log(account.address);
    console.log(tokenId);
    console.log(tokenAddress);
    console.log(asset_contract.schema_name);
    // The offerer's wallet address:
    // const accountAddress = "0x1234..."
    console.log(fromAddress);
    console.log(fromAmount);

    try {
      const seaport = new OpenSeaPort(window.web3.currentProvider, {
        networkName: Network.Main,
      });

      const offer = await seaport.createBuyOrder({
        asset: {
          tokenId,
          tokenAddress,
          schemaName: asset_contract.schema_name, // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
        },
        accountAddress: account.address,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        paymentTokenAddress: fromAddress,
        startAmount: fromAmount,
      });
    } catch (error) {
      console.log(error);
    }

    freeLoader('makingOffer');
  };

  const onChangeFromSelect = (value) => {
    setError('');
    setFromAddress(value);
  };

  const onSelectAssetIn = async (eventKey) => {
    const token = fromOptions.find(({ address }) => eventKey === address);
    const { symbol, address, image_url } = token;

    let balance = await store.getAssetBalance(token);
    console.log(balance);
    setSelectedAssetBalance(await store.getAssetBalance(token));

    onChangeFromSelect(address);
    setFromToggleContents(
      <>
        <img
          style={{
            maxHeight: '22px',
            marginRight: '5px',
          }}
          src={image_url}
          alt=''
        />
        {symbol}
      </>
    );
  };

  const dropdownOptions = (options) => {
    return options.map(({ address, symbol, image_url }) => {
      return (
        <Dropdown.Item key={address} eventKey={address}>
          <div className='d-flex justify-content-between'>
            <img
              style={{
                maxHeight: '22px',
              }}
              src={image_url}
              alt=''
            />
            <span className='dropdown-item'>{symbol}</span>
          </div>
        </Dropdown.Item>
      );
    });
  };

  const onChangeFrom = async (amountIn) => {
    setError('');
    setFromAmount(amountIn);
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

      console.log(asset);
      console.log(asset.token_id);

      const order = await seaport.api.getOrder({
        asset_contract_address: asset.asset_contract.address,
        side: OrderSide.Sell,
        token_id: asset.token_id,
        order_by: 'created_date',
        order_direction: 'desc',
        bundled: 'false',
        include_bundled: 'false',
        include_invalid: 'false',
      });

      console.log(JSON.stringify(order));

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
    // const accountAddress = '0x...'; // The buyer's wallet address, also the taker
    // const transactionHash = await this.props.seaport.fulfillOrder({
    //   order,
    //   accountAddress,
    // });
  };

  return (
    <div className='pt-5 mt-sm-0 p-sm-5 px-3'>
      {asset?.owner ? (
        <div className='row'>
          <div className='col-md-4 col-sm-12'>
            <div className='card'>
              <img className='img-fluid' src={asset.image_url} alt='' />
            </div>
            <div className='card mt-3'>
              <div className='card-body'>
                <h5 className='card-title'>Details</h5>
                {asset.description && (
                  <>
                    <hr />
                    {asset.description}
                  </>
                )}
                <hr />
                Rarity Score:
                {` ${asset.traits
                  .reduce(
                    (acc, t) =>
                      acc +
                      1 /
                      ((t.trait_count * (1 / asset.traits.length)) /
                        asset.collection.stats.total_supply),
                    0
                  )
                  .toLocaleString()}`}
                <hr />
                <div className=''>
                  {asset?.owner?.address !==
                    '0x0000000000000000000000000000000000000000' ? (
                    <>
                      <span>
                        <img
                          src={asset.owner.profile_img_url}
                          className='owner-img mr-2'
                          alt=''
                        />
                        Owned By
                      </span>
                      <a
                        href={`https://etherscan.io/address/${asset?.owner?.address}`}
                        target='_blank'
                      >
                        <span className='small gray ml-2'>
                          {asset.owner?.address
                            ? asset.owner?.address.substr(0, 6)
                            : ''}
                        </span>
                      </a>
                    </>
                  ) : (
                    <>
                      <Accordion defaultActiveKey='0'>
                        <Accordion.Item eventKey='0'>
                          <Accordion.Header>
                            {asset?.collection?.stats?.num_owners} owners
                          </Accordion.Header>
                          <Accordion.Body>
                            Showing top 10 owners.
                            {asset.top_ownerships?.map(
                              ({ owner, quantity }) => {
                                return (
                                  <div key={owner.address}>
                                    <img
                                      src={owner.profile_img_url}
                                      className='owner-img mr-2'
                                      alt=''
                                    />
                                    <a
                                      href={`https://etherscan.io/address/${owner.address}`}
                                      target='_blank'
                                    >
                                      <span className='small gray ml-2'>
                                        {`${owner.address?.substr(
                                          0,
                                          5
                                        )}...${owner.address?.substring(
                                          owner.address?.length - 4,
                                          owner.address?.length
                                        )}`}
                                      </span>
                                    </a>
                                    <span
                                      className='small gray'
                                      style={{ marginLeft: '2px' }}
                                    >
                                      owns: {quantity}
                                    </span>
                                  </div>
                                );
                              }
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </>
                  )}
                </div>
                <hr />
                <div>
                  <b>Chain Info: </b>

                  <div className='d-flex justify-content-between'>
                    <span>Contract address</span>
                    <a
                      href={`https://etherscan.io/address/${asset.asset_contract?.address}`}
                      target='_blank'
                    >
                      <span className='small gray'>
                        {`${asset?.asset_contract?.address.substr(
                          0,
                          5
                        )}...${asset.asset_contract?.address.substring(
                          asset.asset_contract?.address.length - 4,
                          asset.asset_contract?.address.length
                        )}`}
                      </span>
                    </a>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <span>Token Id</span>
                    <span className='small gray'>
                      {asset?.token_id.substr(0, 10)}
                      {asset?.token_id.length > 10 && '...'}
                    </span>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <span>Schema</span>
                    <span className='small gray'>
                      {asset?.asset_contract?.schema_name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-8'>
            <div>
              <h4>{asset.name}</h4>
              {asset.creator && (
                <div>
                  <img
                    src={asset.creator?.profile_img_url}
                    className='owner-img mr-2'
                    alt=''
                  />
                  Created By {asset.creator?.user?.username}
                  <a
                    href={`https://etherscan.io/address/${asset?.creator?.address}`}
                    target='_blank'
                  >
                    <span className='small gray ml-2'>
                      {`${asset.creator?.address.substr(
                        0,
                        5
                      )}...${asset.creator?.address.substring(
                        asset.creator?.address.length - 4,
                        asset.creator?.address.length
                      )}`}
                    </span>
                  </a>
                </div>
              )}
            </div>
            <div className='row'>
              <div className='col-md-3'></div>
            </div>
            <div className='card mt-3'>
              <div className='card-body'>
                <h5 className='card-title'>
                  {sellOrder && (
                    <>
                      <span>
                        {`${sellOrder.current_price}` / 1000000000000000000} eth
                      </span>
                      <span>
                        {' '}
                        (
                        {(
                          (`${sellOrder.current_price}` / 1000000000000000000) *
                          sellOrder.payment_token_contract.usd_price
                        ).toFixed(2)}{' '}
                        usd)
                      </span>
                    </>
                  )}
                </h5>

                {/* asset?.orders?.length  */}
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
                <hr />

                <h4>Offers</h4>
                {buyOrders.length ? (
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>from</th>
                        <th>price</th>
                        <th>expiration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyOrders.map((order, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <img
                                src={order.maker?.profile_img_url}
                                className='owner-img mr-2'
                                alt=''
                              />
                              {order.maker?.user?.username
                                ? order.maker.user.username
                                : order.maker?.address.substr(0, 6)}
                            </td>
                            <td>
                              <img
                                src={order.payment_token_contract.image_url}
                                className='owner-img mr-2'
                                alt=''
                              />
                              {order.base_price /
                                10 **
                                order.payment_token_contract.decimals}{' '}
                              (
                              {`$${(
                                (order.base_price /
                                  10 ** order.payment_token_contract.decimals) *
                                order.payment_token_contract.usd_price
                              ).toFixed(2)}`}
                              )
                            </td>
                            <td>{moment(order.closing_date).fromNow()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  'no offers yet'
                )}

                <br />

                <hr />
                {enabledOfferForm && (
                  <div id='sell-order-wrapper'>
                    <div className='d-flex justify-content-between align-items-end'>
                      <span>Select token</span>
                      <span className='pull-right small'>
                        Your balance: {selectedAssetBalance}{' '}
                      </span>
                    </div>
                    <InputGroup className='mb-3'>
                      <Dropdown onSelect={onSelectAssetIn}>
                        <Dropdown.Toggle
                          variant='outline-primary'
                          id='dropdown-flags'
                          className='text-left'
                        >
                          {fromToggleContents}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {dropdownOptions(fromOptions)}
                        </Dropdown.Menu>
                      </Dropdown>

                      <Form.Control
                        style={{ width: '55%' }}
                        type='number'
                        value={fromAmount}
                        onChange={(e) => onChangeFrom(e.target.value)}
                        aria-describedby='basic-addon1'
                      />
                    </InputGroup>
                  </div>
                )}

                <div className='d-flex justify-content-between'>
                  {account ? (
                    <button
                      className='btn btn-outline-primary mt-3'
                      disabled={
                        loaders.makingOffer ||
                        (enabledOfferForm &&
                          (!+fromAmount || +selectedAssetBalance < +fromAmount))
                      }
                      onClick={
                        enabledOfferForm
                          ? onMakeOffer
                          : () => seteEnabledOfferForm(true)
                      }
                    >
                      {loaders.makingOffer
                        ? 'complete in metamask ...'
                        : 'Make offer'}
                    </button>
                  ) : (
                    <div>
                      <br />
                      <b>
                        to make an offer or to buy this item, connect your
                        wallet first
                      </b>
                    </div>
                  )}

                  {enabledOfferForm && (
                    <button
                      className='btn btn-secondary mt-3'
                      disabled={loaders.makingOffer}
                      onClick={() => seteEnabledOfferForm(false)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <div className='lds-roller'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NftDetails;
