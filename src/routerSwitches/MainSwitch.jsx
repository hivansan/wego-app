import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import GetListed from '../pages/getListed';
import Home from '../pages/home/Home';
import NftDetails from '../pages/nftDetails';
import CollectionDetails from '../pages/CollectionDetails/CollectionDetails';
import SearchResults from '../pages/searchResults/SearchResults';
import Error404 from '../pages/Error404';
import Graphs from '../pages/graphs/graphs';
import Header from '../molecules/header';
import Footer from '../molecules/footer.jsx';
import AssetDetail from '../molecules/AssetDetail';
import Profile from '../pages/Profile';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import { useDispatch } from 'react-redux';
import { setAccount } from '../store/actions/actionAccount';

const MainSwitch = () => {
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [collectionAddress, setCollectionAddress] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const background = location.state && location.state.background;
  const filters = location.state && location.state.filters;

  const isSearchResultsOpen = location.state && location.state.searchResults;
  useEffect(() => {
    if (location.pathname === `/collection/${collectionAddress}`) {
      return setFooter(false);
    }

    if (location.pathname === collectionAddress) {
      setHeader(false);
      return setFooter(false);
    }

    setHeader(true);
    setFooter(true);
  }, [location.pathname, collectionAddress]);

  return (
    <>
      {header && (
        <Header
          background={background}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          isSearchResultsOpen={isSearchResultsOpen}
        />
      )}
      <Switch location={background || location}>
        <Route
          exact
          path='/item/:tokenAddress/:tokenId'
          component={NftDetails}
        ></Route>

        {/*<Route path='/analytics'>
          <Graphs isSearchResultsOpen={isSearchResultsOpen} />
        </Route>*/}

        {/*<Route path='/getlisted'>
          <GetListed isSearchResultsOpen={isSearchResultsOpen} />
        </Route>*/}
        <Route exact path='/favorites'>
          <Profile />
        </Route>
        <Route exact path='/mynfts'>
          <Profile />
        </Route>
        <Route
          path='/assets/:address/:tokenId'
          children={
            <AssetDetail
              setHeader={setHeader}
              setFooter={setCollectionAddress}
            />
          }
        />
        <Route path='/collection/:slug'>
          <CollectionDetails
            locationState={filters}
            setFooter={setCollectionAddress}
            isSearchResultsOpen={isSearchResultsOpen}
          />
        </Route>

        <Route exact path='/search'>
          <SearchResults />
        </Route>

        <Route path='/terms' exact>
          <Terms />
        </Route>

        <Route path='/privacy' exact>
          <Privacy />
        </Route>

        <Route path='/' exact>
          <Home isSearchResultsOpen={location} />
        </Route>

        <Route path='*' status={404}>
          <Error404 />
        </Route>
      </Switch>

      {footer && <Footer />}
      {background && (
        <Route path='/assets/:address/:tokenId' children={<AssetDetail />} />
      )}
    </>
  );
};

export default MainSwitch;
