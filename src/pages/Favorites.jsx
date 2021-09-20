import React, { useEffect, useState } from 'react';
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../constants';
import Store from '../stores/store';
const { emitter, store } = Store;

const Favorites = () => {
  const [library, setLibrary] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    emitter.on(CONNECTION_CONNECTED, () => {
      setLibrary(store.getStore('web3context'));
      setConnected(true);
    });
    emitter.on(CONNECTION_DISCONNECTED, () => {
      setConnected(false);
      setLibrary(null);
    });
  }, [library]);

  if (!connected) {
    return <h1>Sign in to your wallet.</h1>;
  }

  console.log(library);
  return <h1>si hay</h1>;
};

export default Favorites;
