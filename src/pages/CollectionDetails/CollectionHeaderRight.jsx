import React from 'react';
import DarkPrimaryButton from '../../atoms/darkPrimaryButton';
import LightPrimaryButton from '../../atoms/lightPrimaryButton';
import CollectionStats from '../../molecules/CollectionStats';

const CollectionHeaderRight = ({ collectionInfo }) => {
  return (
    <div className='right-section'>
      <div className='right-buttons'>
        <DarkPrimaryButton>View collection</DarkPrimaryButton>
        <LightPrimaryButton>Explore traits</LightPrimaryButton>
        <LightPrimaryButton>My Wallet</LightPrimaryButton>
      </div>
      <CollectionStats collection={collectionInfo} />
    </div>
  );
};

export default CollectionHeaderRight;
