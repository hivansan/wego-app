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
                    <img
                      src={collectionInfo.imgMain}
                      alt={`${collectionInfo.slug} logo`}
                    />
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
                    <div className='collection-personal-stats'>
                      <small className='wego-score'>
                        Wego Score: <strong>{collectionInfo.wegoScore}</strong>
                      </small>
                      <small>
                        Date Added:{' '}
                        {moment(collectionInfo.createdAt).format('ll')}
                      </small>
                    </div>
                  </div>
                </div>
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
                  <a
                    href={collectionInfo.website}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <FaLink size={30} />
                    <small>Website</small>
                  </a>
                )}
              </div>
              <div className='social'>
                {collectionInfo.discord && (
                  <a
                    href={collectionInfo.discord}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <FaDiscord size={30} />
                    <small>Discord</small>
                  </a>
                )}
              </div>
              <div className='social'>
                {collectionInfo.twitter && (
                  <a
                    href={`https://twitter.com/${collectionInfo.twitter}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <FaTwitter size={30} />
                    <small>Twitter</small>
                  </a>
                )}
              </div>
              <div className='social'>
                {collectionInfo.instagram && (
                  <a
                    href={collectionInfo.instagram}
                    target='_blank'
                    rel='noreferrer'
                  >
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
