import { pipe, prop } from 'ramda';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as Relay from './services/relay';
import { Socket } from './services/socket';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const socket = new Socket({
  url: 'ws://localhost:3003/',//location.origin.replace(/^http/, 'ws'),
  dispatch: pipe(prop('data'), Relay.broadcast),
});
socket.start();

ReactDOM.render(<App />, document.getElementById('root'));

/**
 * Debugging
 */
Object.assign(window, { socket, Relay });