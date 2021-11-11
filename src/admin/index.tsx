import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { adminKey } from '../services/auth';

const Admin = ({ events }) => (
  <div>
    {events.map(({ display_received_at, source_ip, program, message }) => (
      <div style={{ height: '22px', overflow: 'hidden' }}>
        <span style={{ color: 'lightgray' }}>{display_received_at}&nbsp;</span>
        <span style={{ color: 'darkcyan' }}>{source_ip}&nbsp;</span>
        <span style={{ color: 'cyan' }}>[{program}]&nbsp;</span>
        <span title={message} style={{ color: 'white' }}>{message}</span>
      </div>
    ))}
  </div>
);

const container = document.getElementById('admin');

Object.assign(container.style, {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '250px',
  zIndex: 99999,
  display: 'none',
  background: 'black',
  color: 'rgb(75, 164, 82)',
  overflow: 'scroll',
  textAlign: 'left',
  fontFamily: 'Courier New',
  fontSize: '14px',
  whiteSpace: 'nowrap'
});

axios(`/data/${adminKey()}`).then(({ data }) => {
  const api = axios.create({
    baseURL: 'https://papertrailapp.com/api/v1',
    headers: { 'X-Papertrail-Token': data.paperTrailKey }
  });

  let maxId = null, events = [];

  document.addEventListener('keydown', e => {
    if (e.key !== '`') {
      return;
    }
    container.style.display = (
      container.style.display === 'none'
        ? 'block'
        : 'none'
    );
  });

  setInterval(() => {
    api.get('events/search.json', {
      params: {
        // q: '',
        // system_id: null,
        // group_id: null,
        tail: true,
        min_id: maxId
      }
    })
      .then(({ data }) => {
        maxId = data.max_id;
        events = events.concat(data.events).slice(-1000);
        ReactDOM.render(React.createElement(Admin, { events }), container);
      });

    ReactDOM.render(React.createElement(Admin, { events }), container);
  }, 3500);
});