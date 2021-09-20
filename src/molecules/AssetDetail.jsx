import React, { useState, useEffect } from 'react';

import Modal from '../atoms/Modal';
import DarkPrimaryButton from '../atoms/darkPrimaryButton';
import LightPrimaryButton from '../atoms/lightPrimaryButton';

import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';

const AssetDetailModal = ({
  tokenId = '12312312312312312312',
  image = 'https://lh3.googleusercontent.com/dG9YdzvAUCNMhB9cwDLziLFWoHgGytlCxAQ-uJ67USsch7-6iZu5kvgMcMB8WGpbXRXdq7A86Z-P9lUvceQ-MaSUTsAP2qYEKo_0dg=w600',
  name = 'Mutant Ape Yach Club',
  address = '0x123',
  dateAdded = '20 jul 2021',
  owners = 300,
  setModalLink,
}) => {
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const back = (e) => {
    e.stopPropagation();
    if (!location.key) {
      history.push('/');
      setModalLink('');
      return false;
    }

    history.goBack();
    setOpen(false);
  };

  useEffect(() => {
    if (!location.key) {
      setModalLink(match.path);
    }
  }, []);

  return (
    <Modal bodyStyles='asset-detail-modal-body' open={open} onClose={back}>
      <div className='asset-detail-modal-info-container'>
        <div className='asset-detail-modal-info'>
          <header className='asset-detail-modal-info-header'>
            Rarity Rank #22
          </header>
          <img src={image} alt={name} />
          <p>{name}</p>

          <a href='/#'>
            <div className='asset-modal-opensea'>
              <img
                src='https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png'
                alt='open sea logo'
              />
              <p>
                View on OpenSea <strong>1ETH</strong>
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className='asset-detail-modal-stats'>
        <div className='rarity-score'>
          <div className='rarity-score-title'>Rarity Score</div>
          <div className='rarity-score-content'>4583.12</div>
        </div>

        <div className='asset-detail-modal-stats-filters-sorts'>
          <DarkPrimaryButton>Sorted Traits</DarkPrimaryButton>
          <LightPrimaryButton>By Category</LightPrimaryButton>
        </div>

        <div className='asset-detail-modal-stats-filters-container'>
          <ul>
            <li>Rarity Score</li>
            <li>Highest Floor Price</li>
            <li>Name</li>
          </ul>

          <div className='asset-detail-modal-stats-filters'>
            <div className='asset-detail-modal-stats-filter'>
              <div className='asset-detail-filter-header'>
                <small>Text</small>
                <div className='asset-detail-filter-header-n'>
                  <small>0.35 ETH</small>
                  <small>+1157.41</small>
                </div>
              </div>
              <div className='asset-detail-filter-attribute'>
                <small>NFT ART</small>
                <div className='asset-detail-filter-a'>
                  <p>30</p>
                </div>
              </div>
            </div>
            <div className='asset-detail-modal-stats-filter'>
              <div className='asset-detail-filter-header'>
                <small>Color</small>
                <div className='asset-detail-filter-header-n'>
                  <small>0.35 ETH</small>
                  <small>+1157.41</small>
                </div>
              </div>
              <div className='asset-detail-filter-attribute'>
                <small>Color</small>
                <div className='asset-detail-filter-a'>
                  <p>1</p>
                </div>
              </div>
            </div>
            <div className='asset-detail-modal-stats-filter'>
              <div className='asset-detail-filter-header'>
                <small>Style</small>
                <div className='asset-detail-filter-header-n'>
                  <small>0.35 ETH</small>
                  <small>+1157.41</small>
                </div>
              </div>
              <div className='asset-detail-filter-attribute'>
                <small>Style</small>
                <div className='asset-detail-filter-a'>
                  <p>100</p>
                </div>
              </div>
            </div>
            <div className='asset-detail-modal-stats-filter'>
              <div className='asset-detail-filter-header'>
                <small>Pixels</small>
                <div className='asset-detail-filter-header-n'>
                  <small>0.35 ETH</small>
                  <small>+1157.41</small>
                </div>
              </div>
              <div className='asset-detail-filter-attribute'>
                <small>299,213.2</small>
                <div className='asset-detail-filter-a'>
                  <p>10</p>
                </div>
              </div>
            </div>
            <div className='asset-detail-modal-stats-filter'>
              <div className='asset-detail-filter-header'>
                <small>Trait Count</small>
                <div className='asset-detail-filter-header-n'>
                  <small>0.35 ETH</small>
                  <small>+1157.41</small>
                </div>
              </div>
              <div className='asset-detail-filter-attribute'>
                <small>5</small>
                <div className='asset-detail-filter-a'>
                  <p>189</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AssetDetailModal;
