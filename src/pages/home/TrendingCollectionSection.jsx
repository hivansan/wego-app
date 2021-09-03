import React from 'react';

import SlickSlider from '../../molecules/Slider';
import TrendingCard from '../../molecules/trendingCard';

const TrendingCollection = () => {
  return (
    <section className='trend-collections-section'>
      <h1>
        Trending <strong>collections</strong>
      </h1>
      <div className='trend-collections-section-slider-container'>
        <SlickSlider>
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
        </SlickSlider>
      </div>
    </section>
  );
};

export default TrendingCollection;
