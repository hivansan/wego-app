import { pipe, prop } from 'ramda';
import React, { useEffect, useState } from 'react';
import TopCollectionsCard from '../../molecules/TopCollectionsCard';
import { Api } from '../../services/api';

const TopCollectionSection = ({ location }) => {
  const [totalVolumeCollections, setTotalVolumeCollections] = useState(null);
  const [byOwnerCountCollections, setByOwnerCountCollections] = useState(null);
  const [sevenDayAvgPrice, setSevenDayAvgPrice] = useState(null);
  const api = new Api();

  useEffect(() => {
    const getTopCollections = () => {
      return Promise.all(
        [
          ['numOwners', setByOwnerCountCollections],
          ['sevenDayAveragePrice', setSevenDayAvgPrice],
          ['totalVolume', setTotalVolumeCollections]
        ].map(([sort, setter]) => api.collections.all({ sort }).then(pipe(prop('results'), setter)))
      )
    };
    getTopCollections();
  }, []);

  return (
    <section className='top-collections-section'>
      <h1 className='text-center mb-5'>Top Collections</h1>
      <div className='top-collections-section-container'>
        <TopCollectionsCard
          topCollections={totalVolumeCollections}
          title='By Total volume'
        />
        <TopCollectionsCard
          topCollections={sevenDayAvgPrice}
          title='By 7 Day Average Price'
        />
        <TopCollectionsCard
          topCollections={byOwnerCountCollections}
          title='By Owner Count'
        />
      </div>
    </section>
  );
};

export default TopCollectionSection;
