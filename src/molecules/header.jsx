import React, { useState, createRef } from 'react';
import { FaWallet } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import HotCollectionsBar from './HotCollectionsBar';
import SearchInput from './SearchInput';
import { Link, useLocation, useHistory } from 'react-router-dom';
import ToggleTheme from './header/ToggleTheme';
import { useDebounce } from '../atoms/hooks/useStateDebounce';
import { Api } from '../services/api';

import { useAccount } from '../store/selectors/useAccount';
import Store from '../stores/store';
import { useEffect } from 'react';
import NftSearchBarModal from './NftSearchBarModal';
import HeaderDropDownResults from './DropdownResults/headerResults/HeaderResults';
import WalletModal from '../organisms/WalletModal';
import WalletMenu from '../molecules/WalletMenu';
import { AiOutlineForm } from 'react-icons/ai';
import { IoAnalyticsSharp } from 'react-icons/io5';

import MenuSearchResults from './header/MenuSearchResults';
import Menu from './header/Menu';

const { emitter, store } = Store;

const Header = ({ background, menuOpen, setMenuOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [assetModal] = useState(false);
  const [hotCollections, setHotCollections] = useState(null);
  //const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [param, setParam] = useState('');
  const [debounceParam, setDebounceParam] = useDebounce(param, 500);
  const [isInputHeaderShown, setIsInputHeaderShown] = useState(false);
  const [results, setResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const location = useLocation();
  const searchRef = createRef();
  const history = useHistory();
  const api = new Api();
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const isTablet = useMediaQuery({ query: '(max-width : 1200px)' });

  const _account = useAccount();
  
  //const { ...account } = _account;


  useEffect(() => {

    if (_account && _account.account?.address != "") {
      setAccount(_account.account.address);

    }
  }, [_account]);

  useEffect(() => {
    if (param !== '') {
      setIsOpen(true);
    }
  }, [param, results]);

  useEffect(() => {
    const getHotCollections = async () => {
      const res = await api.collections.all({
        sort: 'featuredCollection'
      });

      let hot_collections = res?.results || [];

      const featured = res.results.filter(c => c.value.stats.featuredCollection);

      if (featured?.length > 0) {
        let repetitions = Math.ceil(10 / featured.length);

        hot_collections = featured;
        for (let i = 0; i < repetitions - 1; i++)
          hot_collections = hot_collections.concat(featured);
      }


      setHotCollections(hot_collections);
    };

    getHotCollections();


    return () => {
      setHotCollections(null);
    };
  }, []);

  useEffect(() => {
    const getRequest = async () => {
      setResults(null);
      try {
        const res = await api.search(debounceParam.trim(), 1, 'collections');
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

    const isSearchResultsOpen = localStorage.getItem('sR');

    if (param !== '' && isSearchResultsOpen) {
      return setIsOpen(true);
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
    if (location.pathname === '/') {
      if (menuOpen) {
        document.body.style.cssText = '';
        return setMenuOpen(false);
      }
    }

    if (menuOpen && param === '') {
      setMenuOpen(false);
      document.body.style.cssText = '';
    }
  }, [location]);

  const setBlur = () => {
    setIgnoreBlur(true);
  };

  const clearIgnoreBlur = () => {
    setIgnoreBlur(false);
  };

  const handleBlur = () => {
    if (ignoreBlur) return;
    setIsOpen(false);
  };

  const onFocusInput = () => {
    if (param !== '') {
      setIsOpen(true);
    }
  };

  const logIn = () => {
    history.push('/login');
  } 

  const openProfile = () => {
    history.push('/mynfts');
  }

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
              <div
                className='search-header'
                onMouseDown={setBlur}
                onMouseUp={clearIgnoreBlur}
                onMouseOut={clearIgnoreBlur}
                onBlur={handleBlur}
              >
                <SearchInput
                  className='input'
                  onFocus={onFocusInput}
                  type='text'
                  placeholder='Search NFT, Collections, or Keyword'
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
                    noItemsFound={
                      <div className='no-items-found'>
                        No items found for this search
                      </div>
                    }
                  >
                    {results && (
                      <HeaderDropDownResults
                        isOpen={isOpen}
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


              {/*<a href='/analytics'>Analytics</a>*/}
              {/*<a href='/getlisted'>Get Listed</a>*/}

              {/* <div
                onClick={() => {
                  connected ? oneClickLogin() : setModalOpen(true);
                }}
              >
                sign
              </div> */}

              <div className='icons'>
                {!(account && account != "") && (
                  <button
                    style={{
                      borderWidth: '0',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                    onClick={() => logIn() /*setModalOpen(true)*/}
                  >
                    <FaWallet size={28} className='header-icon' />
                  </button>
                )}
                {account && account != "" && (
                  <>
                    <WalletMenu address={account} />
                    {/*<span>{account.substring(0, 5)}...</span>*/}
                  </>
                )}
                {/*modalOpen && (
                  <WalletModal
                    handleClose={() => setModalOpen(false)}
                    open={modalOpen}
                  />
                )*/}
              </div>
              <ToggleTheme />
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
              placeholder='Search NFT, Collections, or Keyword'
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
              {/*<a href='/analytics' className='bm-item'>
                <IoAnalyticsSharp size={28} />
                Analytics
                </a>*/}
              {/*<a href='/getlisted' className='bm-item'>
                <AiOutlineForm size={28} />
                Get Listed
                </a>*/}

              <div className='bm-item' onClick={() => account && account != "" ? openProfile() : logIn()/*setModalOpen(true)*/}>
                <FaWallet size={28} />
                {account && account != "" ? (
                  <>{account.substring(0, 15)}... </>
                ) : (
                  'Connect you wallet'
                )}
              </div>

              {/*modalOpen && (
                <WalletModal
                  handleClose={() => setModalOpen(false)}
                  open={modalOpen}
                />
              )*/}

              <div className='bm-item theme-menu'>
                <ToggleTheme />
              </div>
            </>
          ) : (
            <>
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
