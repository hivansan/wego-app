import React, { useState } from 'react';
import { FaWallet, FaUser } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import Accordion from 'react-bootstrap/Accordion';

import HotCollectionsBar from './HotCollectionsBar';
import SearchInput from './SearchInput';

import { Link, useLocation } from 'react-router-dom';

import { useDebounce } from '../atoms/hooks/useStateDebounce';

import { Api } from '../services/api';
import UnlockModal from '../atoms/unlock/unlockModal';
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../constants';
import Store from '../stores/store';
import { useEffect } from 'react';

const { emitter, store } = Store;

const RightMenu = ({ children }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(max-width : 1200px)' });

  return (
    <>
      {isMobile || isTablet ? (
        <div className='right-menu'>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header></Accordion.Header>
              <Accordion.Body>
                <div className='accordion'>
                  {children.map((x, i) => (
                    <div key={x.props.children}>
                      <div>{x}</div>
                      <hr />
                    </div>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ) : (
        <div className='right-menu'>{children}</div>
      )}
    </>
  );
};

///////

const Header = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [assetModal, setAssetModal] = useState(false);
  const [hotCollections, setHotCollections] = useState(null);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [param, setParam] = useState('');
  const [debounceParam, setDebounceParam] = useDebounce(param, 500);

  const location = useLocation();

  const api = new Api();

  const getHotCollections = async () => {
    const res = await api.collections.hotCollections();
    setHotCollections(res);
  };

  useEffect(() => {
    getHotCollections();

    emitter.on(CONNECTION_CONNECTED, () => {
      setConnected(true);
      setAccount(store.getStore('account'));
    });
    emitter.on(CONNECTION_DISCONNECTED, () => {
      setConnected(false);
      setAccount(null);
    });

    return () => {
      setAccount(null);
      setHotCollections(null);
    };
  }, []);

  useEffect(() => {
    if (debounceParam !== '') {
      console.log(debounceParam);
    }
  }, [debounceParam]);

  useEffect(() => {
    if (location.pathname === `/search`) {
      console.log('estamos en search');
    }
  }, [location.pathname]);

  const modalAssetLinkIsOpen = assetModal && 'd-none';

  return (
    <div className='header-container'>
      <nav className={`header ${modalAssetLinkIsOpen}`}>
        {location.pathname === '/' || location.pathname === '/search' ? (
          <div className='hot-bar-header'>
            <HotCollectionsBar hotCollections={hotCollections} />
          </div>
        ) : (
          <div className='left-menu'>
            <div className='d-flex'>
              <Link to='/'>
                <img
                  src={require('../assets/logo/blue&gray.png').default}
                  alt=''
                  className='logo'
                />
              </Link>
            </div>
          </div>
        )}
        {location.pathname === '/' || location.pathname === '/search' ? (
          ''
        ) : (
          <div className='search-header-container'>
            <div className='search-header'>
              <SearchInput
                type='text'
                placeholder='Search Nft, Collections, or Keyword'
                setDebounceParam={setDebounceParam}
                value={param}
                onChange={setParam}
                query={param}
                location={location}
              />
            </div>
          </div>
        )}
        {/* right menu */}
        <RightMenu>
          <Link to='/marketplace'>Marketplace</Link>
          <Link to='/analytics'>Analytics</Link>
          <Link to='/getlisted'>Get Listed</Link>
          <Link to='/stats'>Stats</Link>
          <div className='icons'>
            {connected && <FaUser size={28} className='header-icon' />}
            <button
              style={{
                borderWidth: '0',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setModalOpen(true)}
            >
              <FaWallet size={28} className='header-icon' />
            </button>
            {connected && (
              <span style={{ color: 'black', fontSize: '10px' }}>
                {account?.address.substring(0, 5)}...
              </span>
            )}
            {modalOpen && (
              <UnlockModal
                closeModal={() => setModalOpen(false)}
                modalOpen={modalOpen}
              />
            )}
          </div>
        </RightMenu>
      </nav>
      {location.pathname === '/' || location.pathname === '/search' ? (
        ''
      ) : (
        <HotCollectionsBar hotCollections={hotCollections} />
      )}
    </div>
  );
};

export default Header;
