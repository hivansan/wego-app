import { Web3Provider } from '@ethersproject/providers';
import ms from 'ms.macro';

import { CHAIN_IDS } from '../constants/constants';

const NETWORK_POLLING_INTERVALS = {
  [CHAIN_IDS.MAINNET]: ms`1s`,
  [CHAIN_IDS.ROPSTEN]: ms`1s`,
  [CHAIN_IDS.GOERLI]: ms`1s`,
  [CHAIN_IDS.KOVAN]: ms`1s`,
  [CHAIN_IDS.RINKEBY]: ms`1s`,
};

export default function getProviderLib(provider) {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any'
  );
  library.pollingInterval = 15_000;
  library.detectNetwork().then((network) => {
    const networkPollingInterval = NETWORK_POLLING_INTERVALS[network.chainId];
    if (networkPollingInterval) {
      console.debug('Setting polling interval', networkPollingInterval);
      library.pollingInterval = networkPollingInterval;
    }
  });
  return library;
}
