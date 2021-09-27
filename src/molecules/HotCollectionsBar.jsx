import React, { useState, useEffect } from 'react';
import Slider from '../molecules/Slider';

import { FiArrowUpCircle } from 'react-icons/fi';

const HotCollectionsBar = ({ hotCollections, isInputHeaderShown }) => {
  const widthCollectionsBar = isInputHeaderShown ? 8 : 5;

  useEffect(() => {}, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: widthCollectionsBar,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 1,
    cssEase: 'linear',
  };
  return (
    <div className='hot-collections-bar'>
      {hotCollections && (
        <Slider className='hot-collections' {...sliderSettings}>
          {hotCollections.map((collection, i) => (
            <a href={`/collection/${collection.slug}`} key={collection.id}>
              <div className='hot-collection'>
                <FiArrowUpCircle size={15} color={'green'} />
                {collection.name ? (
                  <p>{collection.name}</p>
                ) : (
                  <p>{collection.slug}</p>
                )}
                <img src={collection.imgMain} alt={collection.name} />
              </div>
            </a>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HotCollectionsBar;
