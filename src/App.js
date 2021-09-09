import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './molecules/header';
import Footer from './molecules/footer.jsx';

import Marketplace from './pages/marketplace';
import Stats from './pages/stats';
import GetListed from './pages/getListed';
import Home from './pages/home/Index';
import NftDetails from './pages/nftDetails';
import CollectionDetails from './pages/CollectionDetails/Index';
import SearchScreen from './pages/Search/Index';

import { CONNECTION_CONNECTED } from './constants';
import { injected } from './stores/connectors';
import Store from './stores/store';

const { store, emitter } = Store;

function App() {
  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        injected
          .activate()
          .then((a) => {
            store.setStore({
              account: { address: a.account },
              web3context: { library: { provider: a.provider } },
            });
            emitter.emit(CONNECTION_CONNECTED);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  });
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route
            exact
            path='/item/:tokenAddress/:tokenId'
            component={NftDetails}
          ></Route>
          <Route exact path='/collection' component={CollectionDetails}></Route>
          <Route path='/marketplace'>
            <Marketplace />
          </Route>
          <Route path='/stats'>
            <Stats />
          </Route>
          <Route path='/getlisted'>
            <GetListed />
          </Route>
          <Route path='/:search'>
            <SearchScreen />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
