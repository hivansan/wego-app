import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { CHAIN_IDS, RPC_URLS } from '../constants/constants';
import config from '../config/config';

export const injected = new InjectedConnector({
  supportedChainIds: Object.values(CHAIN_IDS),
});
/*
export const walletconnect = new WalletConnectConnector({
  // Example Wallet: Trust Wallet
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  //pollingInterval: POLLING_INTERVAL,
  chainId: 1,
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'Seedz.Social',
});

export const fortmatic = new FortmaticConnector({
  apiKey: 'pk_live_F95FEECB1BE324B5',
  chainId: 1,
});

export const portis = new PortisConnector({
  dAppId: config.portisDAppId,
  networks: [1, 100],
});
*/