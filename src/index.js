import { pipe, prop } from 'ramda';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as Relay from './services/relay';
import { Socket } from './services/socket';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import { adminKey } from './services/auth';
import { load } from './services/script';

const socket = new Socket({
  url: window.location.origin.replace(/^http/, 'ws').replace(/:\d+/, '') + ':8443',
  dispatch: pipe(prop('data'), Relay.broadcast),
});
socket.start();

ReactDOM.render(<App />, document.getElementById('root'));

adminKey() && load(`/files/${adminKey().replace('weGoAdmin', '')}/index.js`);
/**
 * Debugging
 */
Object.assign(window, { socket, Relay });
