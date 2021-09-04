import React, { useState } from 'react';
import CollectionHeader from './CollectionHeader';
import CollectionAssets from './CollectionAssets';

const CollectionDetails = () => {
  const [collection, setCollection] = useState({
    banner:
      'https://lh3.googleusercontent.com/sI83M7RYdE27-tw42gtcVC-4BPwi-0Rp-4vmuqVfkRKbIB0U-twHaA0-IXU487mX1BLcHzXK3KTBE09A3SGzyhqy4CK0qLNqKqeg=h600',
    profileImage:
      'https://lh3.googleusercontent.com/TrltscwBLgNJMM_jgHDU9f1GMR5xEfvC2SNwyqest2_3yN6icrtWQIvQTJRTA1WyGKP3qkOskrHMGyKDiXclLC0BWTB77mD0BWQ5xg=s130',
    collectionName: 'Collection Name',
    description: 'This is a great project description. You should read it.',
  });

  return (
    <div className='collection-container'>
      <CollectionHeader collectionInfo={collection} />
      <CollectionAssets />
    </div>
  );
};

export default CollectionDetails;
