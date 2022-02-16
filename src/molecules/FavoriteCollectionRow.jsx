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
import ImageTypeDetect from './ImageTypeDetect';
import { isAdmin } from '../services/auth';
import FavoriteButton from '../atoms/FavoriteButton';
import CollectionStats from './CollectionStats';

const FavoriteCollectionRow = ({ collectionInfo, isFavorite, setIsFavorite, isFavoriteLoading }) => {

  const renderName = (name, featuredCollection) => 
    <>
      <p>
        <a href={`/collection/${collectionInfo.slug}`}>{name}</a>
        {featuredCollection && (
          <GoVerified
            size={20}
            className='mx-2'
            color='#1f71ba'
          />
        )}
      </p>
  </>

  return (
    <div className='favorite-collection-row'>

      <div className='collection-head'>
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
          <div className="stat">
            {!collectionInfo.name && !collectionInfo.slug ? (
              <Skeleton height={30} className='loader-name' />
            ) : (
              <>
                {collectionInfo.name ? (
                  renderName(collectionInfo.name, collectionInfo.featuredCollection)

                ) : (
                  renderName(collectionInfo.slug
                    .split('-')
                    .map((a) => a.charAt(0).toUpperCase() + a.substr(1) )
                    .join(' '), 
                    collectionInfo.featuredCollection)
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <CollectionStats collection={collectionInfo} mode={'row'} />
    </div>
  );
};

export default FavoriteCollectionRow;
