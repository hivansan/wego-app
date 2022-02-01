import {useState, useEffect, useCallback} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import Favorite from '@material-ui/icons/Favorite';

const LOCATIONS = ['/mynfts', '/favorites'];

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

  const favorites = () => {
    history.push('/favorites');
  }


  return (

    <div className={`profile-menu`}>
      <Paper square>
        <Tabs
            value={value}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
        >
            <Tab icon={<PhotoLibrary />} aria-label="my nfts" onClick={myNfts} />
            <Tab icon={<Favorite />} aria-label="favorite" onClick={favorites} />
        </Tabs>
      </Paper>
    </div>

  );
};

export default ProfileMenu;
