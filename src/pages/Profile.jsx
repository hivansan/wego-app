import { useEffect, useState } from 'react';
import { useAccount } from '../store/selectors/useAccount';
import WalletModal from '../organisms/WalletModal';
import ProfileHeader from '../molecules/ProfileHeader';
import ProfileMenu from '../molecules/ProfileMenu';
import { useLocation, useHistory } from 'react-router-dom';
import AssetsList from '../molecules/AssetsList';
import FavoriteAssetList from '../molecules/FavoriteAssetList';
import FavoriteCollectionList from '../molecules/FavoriteCollectionList';
import DarkPrimaryButton from '../atoms/darkPrimaryButton';
import { Api } from '../services/api';
import Sync from '@material-ui/icons/Sync';
import { FaSpinner } from 'react-icons/fa';

const Profile = () => {
  const _account = useAccount();
  const [account, setAccount] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const [tab, setTab] = useState('/mynfts');
  const [isSyncingNFTs, setIsSyncingNFTs] = useState(false);
  
  const api = new Api();
  
  useEffect(() => {
    
    if (_account && _account.account?.address != "") {
      setAccount(_account.account);

    }
  }, [_account]);

  useEffect(() => {
    
    setTab(location.pathname);
  }, [location])

  const handleLogin = () => {

    if (location.pathname === '/login')
      history.goBack();
  }

  const sync = async () => {
    if (account && account.address !== ''){
      setIsSyncingNFTs(true);
      await api.users.refreshNFTs(account.address);
      setIsSyncingNFTs(false);
      window.location.reload();
    }
  }

  if (!account) {
    return <WalletModal 
            isWidget={true}
            customTitle={"Login using your ethereum wallet"}
            customMessage={"Connect your wallet to view your NFTs, favorites and other features."}
            handleClose={handleLogin}
        />;
  }

  return (
    <div className="my-nfts">
      <ProfileHeader account={account} />
      <ProfileMenu />
      
      {tab === '/mynfts' && (
        <div className="mynfts">
          <div className='sync-bar'>
            {!isSyncingNFTs && (<DarkPrimaryButton onClick={sync}> <Sync /> Sync my NFT's </DarkPrimaryButton>)}
            {isSyncingNFTs && (<div className='favorite-spinner'><FaSpinner size={20} className='spinner' /> <span>Syncing...</span></div>)}
          </div>
          <AssetsList search={{ownerAddress: account?.address}} />
        </div>
      )}

      {tab === '/favorite/collections' && <FavoriteCollectionList account={account} />}
      {tab === '/favorite/nfts' && <FavoriteAssetList account={account} />}
      

    </div>);
};

export default Profile;
