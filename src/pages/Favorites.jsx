import { useEffect, useState } from 'react';
import { useAccount } from '../store/selectors/useAccount';
import WalletModal from '../organisms/WalletModal';
import ProfileHeader from '../molecules/ProfileHeader';
import FavoriteAssetList from '../molecules/FavoriteAssetList';
import FavoriteCollectionList from '../molecules/FavoriteCollectionList';

const Favorites = ({address}) => {

  return (
    <div className="favorites">


      <FavoriteCollectionList address={address} />

      <FavoriteAssetList address={address} />

      
    </div>);
};

export default Favorites;
