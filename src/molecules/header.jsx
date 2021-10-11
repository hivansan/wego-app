import React, { useState, createRef } from 'react';
import { FaWallet, FaUser } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
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
import { AiFillShop, AiOutlineForm } from 'react-icons/ai';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { IoIosStats, IoIosClose } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';

import MenuSearchResults from './header/MenuSearchResults';
import Menu from './header/Menu';

const { emitter, store } = Store;

const Header = ({ background, menuOpen, setMenuOpen }) => {
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
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const isTablet = useMediaQuery({ query: '(max-width : 1200px)' });

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
      return history.push(`/search?page=1`);
    }

    history.push(`/search?q=${encodeURI(param)}&page=1`);
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

  useEffect(() => {
    if (!isMobile && !isTablet && menuOpen) {
      setMenuOpen(false);
      // document.body.style.cssText = '';
    }
  }, [isMobile, isTablet]);

  useEffect(() => {
    if (!menuOpen) {
      setParam('');
      setResults(null);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.cssText = '';
    }
  }, [location]);

  return (
    <>
      <div className='header-container'>
        <nav className={`header ${modalAssetLinkIsOpen}`} id='header-wraper'>
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
          {isInputHeaderShown && (
            <div className='search-header-container'>
              <div className='search-header'>
                <SearchInput
                  className='input'
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
          {!isMobile && !isTablet && (
            <div className='right-menu'>
              <Link to='/marketplace'>Marketplace</Link>
              <Link to='/analytics'>Analytics</Link>
              <Link to='/getlisted'>Get Listed</Link>
              <Link to='/stats'>Stats</Link>
              <div className='icons'>
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
            </div>
          )}
        </nav>
        {/* large hotcollections bar */}
        {isInputHeaderShown && (
          <HotCollectionsBar
            hotCollections={hotCollections}
            isInputHeaderShown={isInputHeaderShown}
          />
        )}
      </div>

      {/* Burguer menu outside the header-container cause is an absolute element */}
      {isTablet && (
        <Menu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          isInputHeaderShown={isInputHeaderShown}
          param={param}
        >
          {isInputHeaderShown && isMobile && (
            <SearchInput
              className='bm-input'
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
          )}
          {param === '' ? (
            <>
              <a href='/marketplace' className='bm-item'>
                <AiFillShop size={28} />
                Marketplace
              </a>
              <a href='/analytics' className='bm-item'>
                <IoAnalyticsSharp size={28} />
                Analytics
              </a>
              <a href='/getlisted' className='bm-item'>
                <AiOutlineForm size={28} />
                Get Listed
              </a>
              <a href='/stats' className='bm-item'>
                <IoIosStats size={28} />
                Stats
              </a>
              <div className='bm-item' onClick={() => setModalOpen(true)}>
                <FaWallet size={28} />
                {connected ? (
                  <>{account?.address.substring(0, 15)}... </>
                ) : (
                  'Connect you wallet'
                )}
              </div>
              {modalOpen && (
                <UnlockModal
                  closeModal={() => setModalOpen(false)}
                  modalOpen={modalOpen}
                />
              )}
            </>
          ) : (
            <>
              {' '}
              {isMobile && (
                <MenuSearchResults
                  results={results}
                  location={location}
                  query={param}
                />
              )}
            </>
          )}
        </Menu>
      )}
    </>
  );
};

export default Header;
