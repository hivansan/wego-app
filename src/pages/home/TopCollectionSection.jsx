import React from 'react';
import TopCollectionsCard from '../../molecules/TopCollectionsCard';

import topCollections from '../../db.json';

const TopCollectionSection = ({ location }) => {
  return (
    <section className='top-collections-section'>
      <h1 className='text-center mb-5'>Top Collections</h1>
      <div className='top-collections-section-container'>
        <TopCollectionsCard
          topCollections={topCollections.collections}
          title='By Total volume'
        />
        <TopCollectionsCard
          topCollections={topCollections.collections}
          title='By 7 Day Average Price'
        />
        <TopCollectionsCard
          topCollections={topCollections.collections}
          title='By Owner Count'
        />
      </div>
    </section>
  );
};

export default TopCollectionSection;
