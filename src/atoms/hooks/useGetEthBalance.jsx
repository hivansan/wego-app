import { ethers } from 'ethers';
import { useAccount } from '../../store/selectors/useAccount';

export const useGetEthBalance = async () => {
  const _account = useAccount();
  const { ...account } = _account;

  if (!window.ethereum) return;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  if (account.account.address !== '') {
    try {
      const balance = await provider.getBalance(account.account.address);
      return parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
    } catch (error) {
      console.error('error', error);
      return 0;
    }
  }
};
