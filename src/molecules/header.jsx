import React, { useState, createRef } from 'react';
import { FaWallet, FaUser } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import Accordion from 'react-bootstrap/Accordion';

import HotCollectionsBar from './HotCollectionsBar';
import SearchInput from './SearchInput';

import { Link, useLocation, useHistory } from 'react-router-dom';

import { useDebounce } from '../atoms/hooks/useStateDebounce';

import { Api } from '../services/api';
import UnlockModal from '../atoms/unlock/unlockModal';
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../constants';
import Store from '../stores/store';
import { useEffect } from 'react';
import NftSearchBarModal from './NftSearchBarModal';
import HeaderDropDownResults from './DropdownResults/headerResults/Index';

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

const Header = ({ background }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [assetModal, setAssetModal] = useState(false);
  const [hotCollections, setHotCollections] = useState(null);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [param, setParam] = useState('');
  const [debounceParam, setDebounceParam] = useDebounce(param, 500);
  const [isInputHeaderShown, setIsInputHeaderShown] = useState(false);
  const [results, setResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const searchRef = createRef();
  const history = useHistory();
  const api = new Api();

  useEffect(() => {
    if (param !== '') {
      setIsOpen(true);
    }
  }, [param, results]);

  useEffect(() => {
    const getHotCollections = async () => {
      const res = await api.collections.all();
      setHotCollections(res);
    };

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
    const getRequest = async () => {
      setResults(null);
      try {
        const res = await api.search(debounceParam);
        setResults(res);
      } catch (err) {
        console.log(err);
      }
    };

    if (debounceParam !== '') {
      getRequest();
    }
    if (param === '') {
      setResults(null);
    }

    //cleanup when component unmount
    return () => {
      setResults(null);
    };
  }, [debounceParam]);

  const onPressEnter = () => {
    if (param === '') {
      return history.push(`/search`);
    }

    history.push(`/search?q=${encodeURI(param)}`);
    setParam('');
  };

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/search') {
      return setIsInputHeaderShown(false);
    }

    if (background) {
      if (background.pathname === '/' || background.pathname === '/search') {
        return setIsInputHeaderShown(false);
      }
    }

    setIsInputHeaderShown(true);
  }, [location.pathname]);

  const modalAssetLinkIsOpen = assetModal && 'd-none';

  return (
    <div className='header-container'>
      <nav className={`header ${modalAssetLinkIsOpen}`}>
        {!isInputHeaderShown ? (
          <div className='hot-bar-header'>
            <HotCollectionsBar
              hotCollections={hotCollections}
              isInputHeaderShown={isInputHeaderShown}
            />
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
        {!isInputHeaderShown ? (
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
                ref={searchRef}
                onPressEnter={onPressEnter}
              />

              {param !== '' && (
                <NftSearchBarModal
                  className='search-header-dropdown'
                  isOpen={isOpen}
                  results={results}
                  query={param}
                  location={location}
                >
                  {results && (
                    <HeaderDropDownResults
                      results={results}
                      location={location}
                    />
                  )}
                </NftSearchBarModal>
              )}
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
      {!isInputHeaderShown ? (
        ''
      ) : (
        <HotCollectionsBar
          hotCollections={hotCollections}
          isInputHeaderShown={isInputHeaderShown}
        />
      )}
    </div>
  );
};

export default Header;
