import React, { useEffect, useState } from 'react';
import TopCollectionsCard from '../../molecules/TopCollectionsCard';
import { Api } from '../../services/api';
import topCollections from '../../db.json';

const TopCollectionSection = ({ location }) => {
  const [totalVolumeCollections, setTotalVolumeCollections] = useState(null);
  const [byOwnerCountCollections, setByOwnerCountCollections] = useState(null);
  const [sevenDayAvgPrice, setSevenDayAvgPrice] = useState(null);
  const [topCollections, setTopCollections] = useState(null);
  const api = new Api();

  useEffect(() => {
    const getTopCollections = async () => {
      const res = await api.collections.all({ limit: 10 });
      setTopCollections(res);
    };
    getTopCollections();
  }, []);

  return (
    <section className='top-collections-section'>
      <h1 className='text-center mb-5'>Top Collections</h1>
      <div className='top-collections-section-container'>
        <TopCollectionsCard
          topCollections={topCollections}
          title='By Total volume'
        />
        <TopCollectionsCard
          topCollections={topCollections}
          title='By 7 Day Average Price'
        />
        <TopCollectionsCard
          topCollections={topCollections}
          title='By Owner Count'
        />
      </div>
    </section>
  );
};

export default TopCollectionSection;
