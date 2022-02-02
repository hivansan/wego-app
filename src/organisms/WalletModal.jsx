import React from 'react';

import Modal from '../atoms/Modal';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setAccount } from '../store/actions/actionAccount';
import { useAccount } from '../store/selectors/useAccount';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import accountState from '../store/states/accountState';
import { isMobile } from '../utils/userAgents';
import { injected } from '../web3/connectors';
import { supportedWallets } from '../web3/supportedWallets';



import { GrCopy } from 'react-icons/gr';
import Web3 from 'web3';


const WalletModal = ({ open, handleClose }) => {
  // Save the account to redux
  const dispatch = useDispatch();
  const _setAccount = React.useCallback(
    account => dispatch(setAccount(account)),
    [dispatch]
  );
  const _account = useAccount();
  const { ...account } = _account;
  const [pendingError, setPendingError] = React.useState();
  // important that these are destructed from the account-specific web3-react context

  const { activate, error, deactivate } = useWeb3React();

  React.useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const disconnect = () => {

    window.location.reload();
    _setAccount(Object.assign({}, accountState));
    deactivate();
    localStorage.setItem('connected', 'false');
  };

  const findConnectorData = connector => {
    const key = Object.keys(supportedWallets).find( key => supportedWallets[key].isConnectorConfirmed());
    return key ? supportedWallets[key] : null;
  }

  
  const tryActivation = async connector => {
    Object.keys(supportedWallets).map(key => {
      if (connector === supportedWallets[key].connector) {
        return supportedWallets[key].name;
      }
      return true;
    });
    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          localStorage.setItem('connected', 'true');
          const walletAddress = await connector.getAccount();
          _setAccount({ address: walletAddress, provider: connector });
          handleClose();
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector);
          } else {
            console.error(error);
            setPendingError(true);
          }
        });
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(supportedWallets).map(key => {
      const option = supportedWallets[key];

      if (isMobile) {
        if (option.name !== 'MetaMask') return null;

        return (
          <Button
            key={`connect-${key}`}
            onClick={() => {
              tryActivation(option.connector);
            }}
            className='option'
          >
            <span className='option-container'>
              <img key={option.name} src={option.iconURL} alt={option.name} />
              {option.name}
            </span>
          </Button>
        );
      }

      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return null;
          } else {
            return null;
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // generic injected provider
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Button
            key={`connect-${key}`}
            onClick={() => {
              tryActivation(option.connector);
            }}
            className='option'
          >
            <span className='option-container'>
              <img key={option.name} src={option.iconURL} alt={option.name} />
              {option.name}
            </span>
          </Button>
        )
      );
    });
  }

  function getModalContent() {
    return <>{getOptions()}</>;
  }

  function ConnectedWallet() {
    const connectorData = findConnectorData(account.account.provider);
    const walletName = connectorData 
      ? <>
          <img key={connectorData.name} src={connectorData.iconURL} alt={connectorData.name} />
          {connectorData.name}
        </> 
      : "Wallet";

    return (
      <>
        <header className='wallet-modal__header'>Account</header>
        <div className='wallet-modal__body'>
          <small>Address</small>
          <div className='wallet-modal__body__account__address'>
            <a
              href={`https://etherscan.io/address/${account.account.address}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {account.account.address.substr(0, 5)}...
              {account.account.address.substr(
                account.account.address.length - 4,
                account.account.address.length
              )}
            </a>
            <GrCopy
              onClick={() =>
                navigator.clipboard.writeText(account.account.address)
              }
            />
          </div>
          <br />
          <small>Connected with</small>
          <div className='wallet-modal__body__account__provider'>
            <span className='wallet-container'>
              {walletName}
            </span>
          </div>
          <div className='wallet-modal__body__account__disconnect'>
            <Button onClick={disconnect}>Disconnect</Button>
          </div>

        </div>
      </>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isLoading={true}
      bodyStyles='wallet-modal-body'
    >
      <div className='wallet-modal'>
        {account.account.address ? (
          <ConnectedWallet />
        ) : (
          <>
            <header className='wallet-modal__header'>Connect Wallet</header>
            <div className='wallet-modal__body'>
              <div className='wallet-modal__body__info'>
                {/* <p>
                  By connecting a wallet, you agree to Uniswap Labs’ Terms of
                  Service and acknowledge that you have read and understand the
                  Uniswap protocol disclaimer.
                </p> */}
              </div>
              <div className='wallet-modal__body__options'>
                {getModalContent()}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default WalletModal;
