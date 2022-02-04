// import Web3Modal from 'web3modal';
// import { Web3Provider } from '@ethersproject/providers';
import getProviderLib from './getProviderLib';
// import WalletLink from "walletlink";

// const providerOptions = {
//   walletlink: {
//     package: WalletLink, // Required
//     options: {
//       appName: "My Awesome App", // Required
//       infuraId: "INFURA_ID", // Required unless you provide a JSON RPC url; see `rpc` below
//       rpc: "", // Optional if `infuraId` is provided; otherwise it's required
//       chainId: 1, // Optional. It defaults to 1 if not provided
//       appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
//       darkMode: false // Optional. Use dark theme, defaults to false
//     }
//   }
// };


export default async function personalSign(account) {
  const lib = !!window.ethereum ? getProviderLib(account.provider) : getProviderLib(account.provider.provider);
  // const web3Modal = new Web3Modal({
  //   network: "mainnet", // optional
  //   cacheProvider: true, // optional
  //   providerOptions // required
  // });

  // const instance = await web3Modal.connect();
  // const provider = new Web3Provider(instance);
  // console.log(provider);

  return lib.jsonRpcFetchFunc('personal_sign', [
    'Sign your login',
    account.address,
  ]); //!!window.ethereum?.ismetamask
  /* ? window.ethereum.request({
    method: 'personal_sign',
    params: ['Sign your login', account.address],
    from: account.address,
  })
  // lib should be working for every wallet
  :  */

}