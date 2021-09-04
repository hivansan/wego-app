import React from 'react';

import { FaLink, FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa';

const CollectionHeaderLeft = ({ collectionInfo }) => {
  return (
    <div className='left-section'>
      <section className='left-section-header'>
        <div className='left-header-info'>
          <div className='d-flex'>
            <img src={collectionInfo.profileImage} alt='' />
            <div>
              <p>{collectionInfo.collectionName}</p>
              <p>Ranked by Wego</p>
            </div>
          </div>
          <small>Date Added: 27 julio</small>
        </div>
      </section>
      <section className='collection-description'>
        <p>Description:</p>
        <p>
          {collectionInfo.description} Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Nihil exercitationem unde, inventore vero aut
          eveniet ipsum molestias quam cumque a suscipit, asperiores at sit
          magni doloribus harum, dolor distinctio pariatur.
        </p>
      </section>
      <section className='collection-socials'>
        <div className='social'>
          <FaLink size={30} />
          <small>Website</small>
        </div>
        <div className='social'>
          <FaDiscord size={30} />
          <small>Discord</small>
        </div>
        <div className='social'>
          <FaTwitter size={30} />
          <small>Twitter</small>
        </div>
        <div className='social'>
          <FaInstagram size={30} />
          <small>Instagram</small>
        </div>
      </section>
    </div>
  );
};

export default CollectionHeaderLeft;
