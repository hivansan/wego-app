import React, { useState } from 'react';

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

const MainSwitch = () => {
  const [modalLink, setModalLink] = useState('');
  const location = useLocation();

  const background = location.state && location.state.background;

  return (
    <>
      {modalLink === '' && <Header />}
      <Switch location={background || location}>
        <Route
          exact
          path='/item/:tokenAddress/:tokenId'
          component={NftDetails}
        ></Route>

        <Route path='/marketplace'>
          <Marketplace />
        </Route>
        <Route path='/stats'>
          <Stats />
        </Route>
        <Route path='/getlisted'>
          <GetListed />
        </Route>

        <Route path='/graph'>
          <Graphs />
        </Route>

        <Route
          path='/assets/:address/:id'
          children={<AssetDetail setModalLink={setModalLink} />}
        />
        <Route path='/collection/:address'>
          <CollectionDetails />
        </Route>

        <Route exact path='/:search'>
          <SearchResults />
        </Route>

        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>
      {modalLink === '' && <Footer />}

      {/* Show the modal when a background page is set */}
      {background && (
        <Route path='/assets/:address/:id' children={<AssetDetail />} />
      )}
    </>
  );
};

export default MainSwitch;
