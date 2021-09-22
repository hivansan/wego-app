import React, { useState, useEffect } from 'react';

import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom';

import Marketplace from '../pages/marketplace';
import Stats from '../pages/stats';
import GetListed from '../pages/getListed';
import Home from '../pages/home/index';
import NftDetails from '../pages/nftDetails';
import CollectionDetails from '../pages/CollectionDetails/Index';
import SearchResults from '../pages/searchResults/Index';

import Graphs from '../pages/graphs/Index';

import Header from '../molecules/header';
import Footer from '../molecules/footer.jsx';

import AssetDetail from '../molecules/AssetDetail';

import Favorites from '../pages/Favorites';

const MainSwitch = () => {
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [collectionAddress, setCollectionAddress] = useState('');
  const location = useLocation();

  const background = location.state && location.state.background;

  useEffect(() => {
    if (location.pathname === `/collection/${collectionAddress}`) {
      return setFooter(false);
    }

    if (location.pathname === `${collectionAddress}`) {
      setHeader(false);
      return setFooter(false);
    }

    setHeader(true);
    setFooter(true);
  }, [location.pathname, collectionAddress]);

  return (
    <>
      {header && <Header />}
      <Switch location={background || location}>
        <Route
          exact
          path='/item/:tokenAddress/:tokenId'
          component={NftDetails}
        ></Route>

        <Route path='/marketplace'>
          <Marketplace />
        </Route>

        <Route path='/analytics'>
          <Graphs />
        </Route>
        <Route path='/stats'>
          <Graphs />
        </Route>
        <Route path='/getlisted'>
          <GetListed />
        </Route>

        <Route path='/graph'>
          <Graphs />
        </Route>
        <Route exact path='/favorites'>
          <Favorites />
        </Route>
        <Route
          path='/assets/:address/:id'
          children={
            <AssetDetail
              setHeader={setHeader}
              setFooter={setCollectionAddress}
            />
          }
        />
        <Route path='/collection/:slug'>
          <CollectionDetails setFooter={setCollectionAddress} />
        </Route>

        <Route exact path='/:search'>
          <SearchResults />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>
      {footer && <Footer />}
      {background && (
        <Route path='/assets/:address/:id' children={<AssetDetail />} />
      )}
    </>
  );
};

export default MainSwitch;
