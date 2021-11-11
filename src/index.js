import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import App from './App';

import { adminKey } from './services/auth';
import { load } from './services/script';

ReactDOM.render(<App />, document.getElementById('root'));

adminKey() && load(`/files/${adminKey().replace('weGoAdmin', '')}/index.js`);