import React, { useEffect, useState } from 'react';
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../constants';
import Store from '../stores/store';
const { emitter, store } = Store;

const Favorites = () => {
  const [library, setLibrary] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    emitter.on(CONNECTION_CONNECTED, () => {
      setLibrary(store.getStore('web3context').library);
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

  return <h1>wallet connected</h1>;
};

export default Favorites;
