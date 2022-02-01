import { useEffect, useState } from 'react';
import { useAccount } from '../store/selectors/useAccount';
import WalletModal from '../organisms/WalletModal';
import ProfileHeader from '../molecules/ProfileHeader';
import ProfileMenu from '../molecules/ProfileMenu';
import { useLocation } from 'react-router-dom';
import MyNfts from './MyNFTs';
import Favorites from './Favorites';

const Profile = () => {
  const _account = useAccount();
  const [account, setAccount] = useState(null);
  const location = useLocation();
  const [tab, setTab] = useState('/mynfts');
  
  
  useEffect(() => {
    
    if (_account && _account.account?.address != "") {
      setAccount(_account.account);

    }
  }, [_account]);

  useEffect(() => {
    setTab(location.pathname);
  }, [location])


  if (!account) {
    return <WalletModal 
            isWidget={true}
            customTitle={"You need an ethereum wallet"}
            customMessage={"Connect your wallet to view your NFTs, favorites and other features."}
        />;
  }

  return (
    <div className="my-nfts">
      <ProfileHeader account={account} />
      <ProfileMenu />
      
      {tab === '/mynfts' && <MyNfts />}
      {tab === '/favorites' && <Favorites />}
      

    </div>);
};

export default Profile;
