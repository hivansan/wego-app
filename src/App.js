import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainSwitch from './routerSwitches/Index';
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from './constants';

import { injected } from './stores/connectors';
import Store from './stores/store';

const { store, emitter } = Store;

class App extends Component {
  state = {
    account: null,
  };

  inject = () => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        injected
          .activate()
          .then((a) => {
            store.setStore({
              account: { address: a.account },
              web3context: { library: { provider: a.provider } },
            });
            this.setState({ account: store.getStore('account') });
            emitter.emit(CONNECTION_CONNECTED);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  componentDidMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);

    this.inject();
  }

  componentWillUnmount() {
    emitter.removeListener(
      CONNECTION_DISCONNECTED,
      this.connectionDisconnected
    );
  }

  connectionConnected = () => {
    // console.log('connection connected');

    localStorage.removeItem('token');
    this.setState({ account: store.getStore('account') });
    // dispatcher.dispatch({ type: CONFIGURE, content: {} });
  };

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') });
  };

  render() {
    return (
      <>
        <Router>
          <MainSwitch />
        </Router>
        <ToastContainer />
      </>
    );
  }
}

export default App;
