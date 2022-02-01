import {useState, useEffect, useCallback} from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setAccount } from '../store/actions/actionAccount';
import { useWeb3React } from '@web3-react/core';
import accountState from '../store/states/accountState';
import { useGetEthBalance } from '../atoms/hooks/useGetEthBalance';
import Identicon from '../atoms/Identicon';
import DarkPrimaryButton from '../atoms/darkPrimaryButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import Favorite from '@material-ui/icons/Favorite';
import ExitToApp from '@material-ui/icons/ExitToApp';


export default function WalletMenu({address, ...props}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ethBalance, setEthBalance] = useState('0.0');
  const history = useHistory();
  const balance = useGetEthBalance();
  const dispatch = useDispatch();
  const _setAccount = useCallback(
    account => dispatch(setAccount(account)),
    [dispatch]
  );
  const { error, deactivate } = useWeb3React();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    async function _setEthBalance() {
      setEthBalance(await balance);
    }
    _setEthBalance();
  });

  const disconnect = () => {

    window.location.reload();
    _setAccount(Object.assign({}, accountState));
    deactivate();
    localStorage.setItem('connected', 'false');
  };

  const myNFTs = () => {
    history.push("/mynfts");
    setAnchorEl(null);
  }

  const favorites = () => {
    history.push("/favorites");
    setAnchorEl(null);
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <div className={'wallet-menu-body'}>
      <div className="small-balance">
        <div>{ethBalance}</div>
        <div>ETH</div>
      </div>
      <DarkPrimaryButton
        className={'wallet-menu-btn'}
        onClick={handleClick}
      >
        <div>
          {`${address.slice(0, 6)}...${address.slice(
              address.length - 4,
              address.length
            )}`}
        </div>
        <Identicon address={address}/>
      </DarkPrimaryButton>
      <Menu
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*
        <MenuItem 
          classes={{root: 'wallet-menu-selected'}}
          onClick={() => {}}
        >
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        */}


        <MenuItem 
          classes={{root: 'wallet-menu-selected'}}
          onClick={myNFTs}
        >
          <ListItemIcon>
            <PhotoLibrary fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My NFTs" />
        </MenuItem>

        <MenuItem 
          classes={{root: 'wallet-menu-selected'}}
          onClick={favorites}
        >
          <ListItemIcon>
            <Favorite fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </MenuItem>

        <MenuItem 
          classes={{root: 'wallet-menu-selected'}}
          onClick={disconnect}
        >
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </MenuItem>

      </Menu>
    </div>
  );
}
