
import WALLET_CONNECT_ICON from '../assets/walletConnectIcon.svg';
import METAMASK_ICON from '../assets/metamask.png';
import INJECTED_ICON from '../assets/arrow-right.svg';
import COINBASE_WALLET_ICON from '../assets/coinbaseWalletIcon.svg';
import { injected, walletlink } from './connectors';


export const supportedWallets= {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconURL: INJECTED_ICON,
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconURL: METAMASK_ICON,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  COINBASE_LINK: {
    connector: walletlink,
    name: 'Open in Coinbase Wallet',
    iconURL: COINBASE_WALLET_ICON,
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    //mobileOnly: true,
  },
  /*
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconURL: WALLET_CONNECT_ICON,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconURL: COINBASE_WALLET_ICON,
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },

  */






  /*
  FORTMATIC: {
    connector: fortmatic,
    name: "Fortmatic",
    iconURL: FORTMATIC_WALLET_ICON,
    description: "Login using Fortmatic hosted wallet",
    href: null,
    color: "#6748FF",
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: "Portis",
    iconURL: PORTIS_WALLET_ICON,
    description: "Login using Portis hosted wallet",
    href: null,
    color: "#4A6C9B",
    mobile: true,
  },
  */
};
