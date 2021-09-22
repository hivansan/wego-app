import React from 'react';

import { FaLink, FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa';

import moment from 'moment';

const CollectionHeaderLeft = ({ collectionInfo }) => {
  return (
    <div className='left-section'>
      <>
        {collectionInfo && (
          <>
            <section className='left-section-header'>
              <div className='left-header-info'>
                <div className='d-flex'>
                  {!collectionInfo ? (
                    <img
                      src='https://via.placeholder.com/120x120.png?Profile'
                      alt='trial'
                    />
                  ) : (
                    <img src={collectionInfo.imgMain} alt='' />
                  )}
                  <div>
                    {collectionInfo.name ? (
                      <p>{collectionInfo.name}</p>
                    ) : (
                      <p>
                        {collectionInfo.slug && (
                          <>
                            {collectionInfo.slug
                              .split('-')
                              .map(
                                (a) => a.charAt(0).toUpperCase() + a.substr(1)
                              )
                              .join(' ')}
                          </>
                        )}
                      </p>
                    )}
                    <p>Ranked by Wego</p>
                  </div>
                </div>
                <small>
                  Date Added: {moment(collectionInfo.createdAt).format('ll')}
                </small>
              </div>
            </section>
            {collectionInfo.description && (
              <section className='collection-description'>
                <p>Description:</p>
                <p>{collectionInfo.description}</p>
              </section>
            )}
            <section className='collection-socials'>
              <div className='social'>
                {collectionInfo.website && (
                  <a href={collectionInfo.website}>
                    <FaLink size={30} />
                    <small>Website</small>
                  </a>
                )}
              </div>
              <div className='social'>
                {collectionInfo.discord && (
                  <>
                    <FaDiscord size={30} />
                    <small>Discord</small>
                  </>
                )}
              </div>
              <div className='social'>
                {collectionInfo.twitter && (
                  <a href={collectionInfo.twitter}>
                    <FaTwitter size={30} />
                    <small>Twitter</small>
                  </a>
                )}
              </div>
              <div className='social'>
                {collectionInfo.instagram && (
                  <a href={collectionInfo.instagram}>
                    <FaInstagram size={30} />
                    <small>Instagram</small>
                  </a>
                )}
              </div>
            </section>
          </>
        )}
      </>
    </div>
  );
};

export default CollectionHeaderLeft;
