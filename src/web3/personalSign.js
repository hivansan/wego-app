import getProviderLib from './getProviderLib';

export default async function personalSign(account) {
  const lib = getProviderLib(account.provider);
  return !!window.ethereum?.ismetamask
    ? window.ethereum.request({
      method: 'personal_sign',
      params: ['Sign your login', account.address],
      from: account.address,
    })
    // lib should be working for every wallet
    : lib.jsonRpcFetchFunc('personal_sign', [
      'Sign your login',
      account.address,
    ]);
}