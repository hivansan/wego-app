import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';

import MainSwitch from './routerSwitches/Index';

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
      <Router>
        <MainSwitch />
      </Router>
    </>
  );
}

export default App;
