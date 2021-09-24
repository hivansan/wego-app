import React from 'react';
import DarkPrimaryButton from '../../atoms/darkPrimaryButton';
import LightPrimaryButton from '../../atoms/lightPrimaryButton';
import CollectionStats from '../../molecules/CollectionStats';

const CollectionHeaderRight = ({ collectionInfo }) => {
  return (
    <div className='right-section'>
      <div className='right-buttons'></div>
      {collectionInfo && <CollectionStats collection={collectionInfo} />}
    </div>
  );
};

export default CollectionHeaderRight;
