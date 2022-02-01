import { useEffect, useState } from 'react';
import { useAccount } from '../store/selectors/useAccount';
import WalletModal from '../organisms/WalletModal';

const MyNFTs = () => {
  const _account = useAccount();
  const [account, setAccount] = useState(null);

  useEffect(() => {

    console.log("account pre the thing", _account);
    if (_account && _account.account?.address != "") {
      setAccount(_account.account);
      console.log("account here", account);

    }
  }, [_account]);


  if (!account) {
    return <WalletModal 
            isWidget={true}
            customTitle={"You need an ethereum wallet"}
            customMessage={"Connect your wallet to view your NFTs, favorites and other features."}
        />;
  }

  return <h1>Welcome tiger!</h1>;
};

export default MyNFTs;
