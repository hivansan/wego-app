import { pipe, prop } from 'ramda';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import getProviderLib from './web3/getProviderLib';

import * as Relay from './services/relay';
import { Socket } from './services/socket';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import { adminKey } from './services/auth';
import { load } from './services/script';

const socket = new Socket({
  url: window.location.origin.replace(/^http/, 'ws').replace(/:\d+/, '') + ':8443',
  dispatch: pipe(prop('data'), Relay.broadcast),
});
socket.start();

ReactDOM.render(
  <Web3ReactProvider getLibrary={getProviderLib}>
    <Provider store={store}>
      <App />
    </Provider>
  </Web3ReactProvider>, 
  document.getElementById('root'));

adminKey() && load(`/files/${adminKey().replace('weGoAdmin', '')}/index.js`);
/**
 * Debugging
 */
Object.assign(window, { socket, Relay });
