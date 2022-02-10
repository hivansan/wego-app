import { useEffect, useState } from 'react';
import FavoriteAssetList from '../molecules/FavoriteAssetList';
import FavoriteCollectionList from '../molecules/FavoriteCollectionList';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Favorites = ({account}) => {

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="favorites">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={(e, v) => { setTabIndex(v) }}
      >
        <Tab label="Favorite Collections" />
        <Tab label="Favorite NFTs" />
      </Tabs>

      <div className="favorites-lists">

        {tabIndex === 0 && (<FavoriteCollectionList account={account} />)}
        {tabIndex === 1 && (<FavoriteAssetList account={account} />)}

      </div>
    </div>
);
};

export default Favorites;
