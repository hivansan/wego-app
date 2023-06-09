import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import {
  ERROR,
  CONNECTION_DISCONNECTED,
  CONNECTION_CONNECTED,
} from '../../constants';

import Store from '../../stores/store';
import unlockStyles from './unlock-styles';

const emitter = Store.emitter;
const store = Store.store;

class Unlock extends Component {
  constructor(props) {
    super();

    this.state = {
      error: null,
      metamaskLoading: false,
      ledgerLoading: false,
    };
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(ERROR, this.error);
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(
      CONNECTION_DISCONNECTED,
      this.connectionDisconnected
    );
    emitter.removeListener(ERROR, this.error);
  }

  error = (err) => {
    this.setState({
      loading: false,
      error: err,
      metamaskLoading: false,
      ledgerLoading: false,
    });
  };

  connectionConnected = () => {
    if (this.props.closeModal != null) {
      this.props.closeModal();
    }
  };

  connectionDisconnected = () => {
    if (this.props.closeModal != null) {
      this.props.closeModal();
    }
  };

  metamaskUnlocked = () => {
    this.setState({ metamaskLoading: false });
    if (this.props.closeModal != null) {
      this.props.closeModal();
    }
  };

  ledgerUnlocked = () => {
    this.setState({ ledgerLoading: false });
    if (this.props.closeModal != null) {
      this.props.closeModal();
    }
  };

  cancelLedger = () => {
    this.setState({ ledgerLoading: false });
  };

  cancelMetamask = () => {
    this.setState({ metamaskLoading: false });
  };

  render() {
    const { classes, closeModal, t } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.closeIcon} onClick={closeModal}>
          <CloseIcon />
        </div>
        <div className={classes.contentContainer}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MyComponent closeModal={closeModal} t={t} />
          </Web3ReactProvider>
        </div>
      </div>
    );
  }
}

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function onConnectionClicked(
  currentConnector,
  name,
  setActivatingConnector,
  activate
) {
  const connectorsByName = store.getStore('connectorsByName');
  console.log(connectorsByName);
  setActivatingConnector(currentConnector);
  activate(connectorsByName[name], (err) => console.log(err));
}

function onDeactivateClicked(deactivate, connector) {
  if (deactivate) {
    deactivate();
  }
  if (connector && connector.close) {
    connector.close();
  }
  store.setStore({ account: {}, web3context: null });
  emitter.emit(CONNECTION_DISCONNECTED);
}

function MyComponent(props) {
  const context = useWeb3React();
  const localContext = store.getStore('web3context');
  var localConnector = null;
  if (localContext) {
    localConnector = localContext.connector;
  }
  const { connector, library, account, activate, deactivate, active, error } =
    context;

  var connectorsByName = store.getStore('connectorsByName');

  const { closeModal } = props;

  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  React.useEffect(() => {
    if (account && active && library) {
      store.setStore({ account: { address: account }, web3context: context });
      emitter.emit(CONNECTION_CONNECTED);
    }
  }, [account, active, closeModal, context, library]);

  // React.useEffect(() => {
  //   if (storeContext && storeContext.active && !active) {
  //     console.log("we are deactive: "+storeContext.account)
  //     store.setStore({ account: {}, web3context: null })
  //   }
  // }, [active, storeContext]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  // const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  // useInactiveListener(!triedEager || !!activatingConnector);
  const width = window.innerWidth;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: width > 650 ? 'space-between' : 'center',
        alignItems: 'center',
      }}
    >
      {Object.keys(connectorsByName).map((name) => {
        const currentConnector = connectorsByName[name];
        const activating = currentConnector === activatingConnector;
        const connected =
          currentConnector === connector || currentConnector === localConnector;
        const disabled = !!activatingConnector || !!error;

        var url;
        var display = name;

        if (name === 'MetaMask') {
          url = require('../../assets/icn-metamask.svg');
        } else if (name === 'WalletConnect') {
          url = require('../../assets/walletConnectIcon.svg');
        } else if (name === 'TrustWallet') {
          url = require('../../assets/trustWallet.png');
        } else if (name === 'Portis') {
          url = require('../../assets/portisIcon.png');
        } else if (name === 'Fortmatic') {
          url = require('../../assets/fortmaticIcon.png');
        } else if (name === 'Ledger') {
          url = require('../../assets/icn-ledger.svg');
        } else if (name === 'Squarelink') {
          url = require('../../assets/squarelink.png');
        } else if (name === 'Trezor') {
          url = require('../../assets/trezor.png');
        } else if (name === 'Torus') {
          url = require('../../assets/torus.jpg');
        } else if (name === 'Authereum') {
          url = require('../../assets/icn-aethereum.svg');
        } else if (name === 'WalletLink') {
          display = 'Coinbase Wallet';
          url = require('../../assets/coinbaseWalletIcon.svg');
        } else if (name === 'Frame') {
          return '';
        }
        return (
          <div
            key={name}
            style={{
              padding: '12px 0px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              style={{
                padding: '16px',
                backgroundColor: '#4a5e72',
                borderRadius: '1rem',
                border: '1px solid #186ce9',
                fontWeight: 500,
                display: 'flex',
                justifyContent: 'space-between',
                minWidth: '250px',
              }}
              variant='outlined'
              color='primary'
              onClick={() => {
                onConnectionClicked(
                  currentConnector,
                  name,
                  setActivatingConnector,
                  activate
                );
              }}
              disabled={disabled}
            >
              <Typography
                style={{
                  margin: '0px 12px',
                  color: '#FFF',
                  fontWeight: 200,
                  fontSize: '1rem',
                }}
                variant={'h3'}
              >
                {display}
              </Typography>

              {!activating && !connected && (
                <img
                  style={{
                    position: 'absolute',
                    right: '20px',

                    width: '30px',
                    height: '30px',
                  }}
                  src={url.default}
                  alt=''
                />
              )}
              {activating && (
                <CircularProgress size={15} style={{ marginRight: '10px' }} />
              )}
              {!activating && connected && (
                <div
                  style={{
                    background: '#4caf50',
                    borderRadius: '10px',
                    width: '10px',
                    height: '10px',
                    marginRight: '10px',
                  }}
                ></div>
              )}
            </Button>
          </div>
        );
      })}

      <div style={{ width: '252px', margin: '12px 0px' }}>
        <Button
          style={{
            padding: '16px',
            backgroundColor: '#4a5e72',
            borderRadius: '1rem',
            border: '1px solid #186ce9',
            fontWeight: 200,
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: '250px',
          }}
          variant='outlined'
          color='primary'
          onClick={() => {
            onDeactivateClicked(deactivate, connector);
          }}
        >
          <Typography
            style={{
              margin: '0px 12px',
              color: '#FFF',
              fontWeight: 200,
              fontSize: '1rem',
            }}
            variant={'h3'}
            color='#FFF'
          >
            Deactivate
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default withStyles(unlockStyles)(Unlock);
