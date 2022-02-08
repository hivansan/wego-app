import getProviderLib from './getProviderLib';

export default async function personalSign(account) {
  const lib = !!window.ethereum ? getProviderLib(account.provider) : getProviderLib(account.provider.provider);
  return lib.jsonRpcFetchFunc('personal_sign', [
    'Sign your login',
    account.address,
  ]);
}