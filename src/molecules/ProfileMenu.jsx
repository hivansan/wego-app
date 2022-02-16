import {useState, useEffect, useCallback} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import Favorite from '@material-ui/icons/Favorite';

const LOCATIONS = ['/mynfts', '/favorite/collections', '/favorite/nfts'];

const ProfileMenu = ({ tabSlug }) => {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    let val = LOCATIONS.findIndex( s => s === location.pathname);

    setValue(val > -1 ? val : 0);
  }, [location]);



  const myNfts = () => {
    history.push('/mynfts');
  }

  
  const favoritesCollections = () => {
    history.push('/favorite/collections');
  }

  const favoritesNFTs = () => {
    history.push('/favorite/nfts');
  }



  return (

    <div className={`profile-menu`}>
      <Paper square elevation={0}>
        <Tabs
            value={value}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
        >
            <Tab icon={<PhotoLibrary />} aria-label="my nfts" label="My NFT's" onClick={myNfts} />
            <Tab icon={<Favorite />} aria-label="favorite" label="Collections" onClick={favoritesCollections} />
            <Tab icon={<Favorite />} aria-label="favorite" label="NFT's" onClick={favoritesNFTs} />
        </Tabs>
      </Paper>
    </div>

  );
};

export default ProfileMenu;
