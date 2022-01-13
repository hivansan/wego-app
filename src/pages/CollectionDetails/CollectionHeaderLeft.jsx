import React from 'react';

import {
  FaLink,
  FaRegEyeSlash,
  FaStar,
  FaSyncAlt,
  FaTwitter,
  FaDiscord,
  FaInstagram,
  FaTrash,
  FaYoutube,
} from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import MarkDown from 'react-markdown';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import ImageTypeDetect from '../../molecules/ImageTypeDetect';
import { isAdmin } from '../../services/auth';

const CollectionHeaderLeft = ({ collectionInfo }) => {
  return (
    <div className='left-section'>
      <>
        <section className='left-section-header'>
          <div className='left-header-info'>
            <div className='d-flex'>
              {!collectionInfo ? (
                <Skeleton
                  circle={true}
                  height={80}
                  width={80}
                  className='img-loader'
                />
              ) : (
                <ImageTypeDetect
                  imageURL={collectionInfo.imgMain}
                  alt={`${collectionInfo.slug} logo`}
                  className='collection-img'
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
                  {!collectionInfo ? (
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
          {!collectionInfo ? (
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
            {collectionInfo.twitter || collectionInfo.slug === "social-bees-university" && (
              <a
                href={`https://twitter.com/${collectionInfo.slug === "social-bees-university" ? "Crypto_Swarm" : collectionInfo.twitter}`}
                target='_blank'
                rel='noreferrer'
              >
                <FaTwitter size={30} />
                <small>Twitter</small>
              </a>
            )}
          </div>
          <div className='social'>
            {collectionInfo.slug === "social-bees-university" && (
              <a
                href="https://www.youtube.com/c/BeesSocialTV"
                target='_blank'
                rel='noreferrer'
              >
                <FaYoutube size={30} />
                <small>Youtube</small>
              </a>
            )}
          </div>
          {isAdmin() && (
            <div className='admin'>
              <form
                method='POST'
                action={`/api/collections/${collectionInfo.slug}/delete`}
                target='_blank'
              >
                <button type='submit'>
                  <FaTrash /> Delete
                </button>
              </form>
              |{' '}
              {collectionInfo.stats &&
                collectionInfo.stats.featuredCollection ? (
                <form
                  method='POST'
                  action={`/api/collections/${collectionInfo.slug}/unfeature`}
                  target='_blank'
                >
                  <button type='submit'>
                    <FaStar /> Un-Feature
                  </button>
                </form>
              ) : (
                <form
                  method='POST'
                  action={`/api/collections/${collectionInfo.slug}/feature`}
                  target='_blank'
                >
                  <button type='submit'>
                    <FaStar /> Feature
                  </button>
                </form>
              )}
              {/* Hide for now until this is implemented for real */}
              {/* |{' '} */}
              {/* <form
                method='POST'
                action={`/api/collections/${collectionInfo.slug}/reindex`}
                target='_blank'
              >
                <button type='submit'>
                  <FaSyncAlt /> Re-Index
                </button>
              </form> */}
            </div>
          )}
        </section>
      </>
    </div>
  );
};

export default CollectionHeaderLeft;
