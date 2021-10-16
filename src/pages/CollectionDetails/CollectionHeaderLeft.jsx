import React from 'react';

import { FaLink, FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import MarkDown from 'react-markdown';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';

const CollectionHeaderLeft = ({ collectionInfo }) => {
  return (
    <div className='left-section'>
      <>
        <section className='left-section-header'>
          <div className='left-header-info'>
            <div className='d-flex'>
              {!collectionInfo.imgMain ? (
                <Skeleton
                  circle={true}
                  height={80}
                  width={80}
                  className='img-loader'
                />
              ) : (
                <img
                  src={collectionInfo.imgMain}
                  alt={`${collectionInfo.slug} logo`}
                />
              )}
              <div>
                {!collectionInfo.name && !collectionInfo.slug ? (
                  <Skeleton height={30} className='loader-name' />
                ) : (
                  <>
                    {collectionInfo.name ? (
                      <>
                        <p>{collectionInfo.name} </p>
                        {collectionInfo.featuredCollection && (
                          <GoVerified
                            size={20}
                            className='mx-2'
                            color='#1f71ba'
                          />
                        )}
                      </>
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
                            {collectionInfo.featuredCollection && (
                              <GoVerified
                                size={20}
                                className='mx-2'
                                color='#1f71ba'
                              />
                            )}
                          </>
                        )}
                      </p>
                    )}
                  </>
                )}
                <div className='collection-personal-stats'>
                  {!collectionInfo.imgMain ? (
                    <Skeleton width={200} className='loader-personal-stats' />
                  ) : (
                    <small>
                      Date Added:
                      {moment(collectionInfo.createdAt).format('ll')}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='collection-description'>
          {!collectionInfo.imgMain ? (
            <>
              <Skeleton className='desc-loading xs' />
              <Skeleton className='desc-loading n' />
              <Skeleton className='desc-loading n' />
              <Skeleton className='desc-loading n' />
              <Skeleton className='desc-loading l' />
              <Skeleton className='desc-loading l' />
            </>
          ) : (
            <>
              {collectionInfo.description && (
                <>
                  <p>Description:</p>
                  <MarkDown>{collectionInfo.description}</MarkDown>{' '}
                </>
              )}
            </>
          )}
        </section>
        <section className='collection-socials'>
          <div className='social'>
            {collectionInfo.website && (
              <a href={collectionInfo.website} target='_blank' rel='noreferrer'>
                <FaLink size={30} />
                <small>Website</small>
              </a>
            )}
          </div>
          <div className='social'>
            {collectionInfo.discord && (
              <a href={collectionInfo.discord} target='_blank' rel='noreferrer'>
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
                href={`https://www.instagram.com/${collectionInfo.instagram}`}
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
    </div>
  );
};

export default CollectionHeaderLeft;
