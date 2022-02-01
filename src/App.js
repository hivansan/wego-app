import React, { Component } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainSwitch from './routerSwitches/MainSwitch';
import config from './config/config';
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from './constants';

import {injected} from './web3/connectors';
import store from './store';
import {SET_ACCOUNT} from './store/actions/actionTypes';
//import { injected } from './stores/connectors';
//import Store from './stores/store';

//const { store, emitter } = Store;

class App extends Component {
  state = {
    account: null,
  };

  inject = () => {
    const web3 = new Web3.providers.HttpProvider(config.infuraProvider);

    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized &&
        JSON.parse(localStorage.getItem('connected'))) {
        injected
          .activate()
          .then(a => {
            store.dispatch({
              type: SET_ACCOUNT,
              payload: {
                address: a.account ? a.account : null,
                provider: a.provider ? a.provider : web3,
              }
            });

          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  componentDidMount() {
    //emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    //emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);

    this.inject();
  }
/*
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
  */

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
