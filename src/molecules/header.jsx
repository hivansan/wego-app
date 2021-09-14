import React, { useState } from 'react';
import { FaWallet, FaUser } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import Accordion from 'react-bootstrap/Accordion';

import HotCollectionsBar from './HotCollectionsBar';

import { Link } from 'react-router-dom';

import { Api } from '../services/api';
import UnlockModal from '../atoms/unlock/unlockModal';
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../constants';
import Store from '../stores/store';
import { useEffect } from 'react';

const { emitter, store } = Store;

const RightMenu = ({ children }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      {isMobile ? (
        <div>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header></Accordion.Header>
              <Accordion.Body>
                <div className='accordion'>
                  {children.map((x, i) => (
                    <div key={x.props.children}>
                      <div style={{ margin: '10px' }}>{x}</div>
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

const Header = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [assetModal, setAssetModal] = useState(false);
  const [hotCollections, setHotCollections] = useState(null);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);

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
  }, []);

  const modalAssetLinkIsOpen = assetModal && 'd-none';

  return (
    <div className='header-container'>
      <header className={`header ${modalAssetLinkIsOpen}`}>
        <div className='left-menu'>
          <img
            src='https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png'
            alt='opensea logo'
          />
          <Link to='/'>
            <img
              src={require('../assets/logo/blue&gray.png').default}
              alt=''
              className='logo'
            />
          </Link>
        </div>

        {/* right menu */}
        <RightMenu>
          <a href='/marketplace'>Marketplace</a>
          <a href='/analytics'>Analytics</a>
          <a href='/getlisted'>Get Listed</a>
          <a href='/stats'>Stats</a>
          <div className='icons'>
            <FaUser size={28} className='header-icon' />
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
                {account?.address.substring(0, 8)}...
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
      </header>
      <HotCollectionsBar hotCollections={hotCollections} />
    </div>
  );
};

export default Header;
