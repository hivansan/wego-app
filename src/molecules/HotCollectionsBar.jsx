import React, { useState, useEffect } from 'react';
import Slider from '../molecules/Slider';

import { FiArrowUpCircle } from 'react-icons/fi';

const HotCollectionsBar = ({ hotCollections, isInputHeaderShown }) => {
  const widthCollectionsBar = isInputHeaderShown ? 6 : 4;

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: widthCollectionsBar,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 1,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='hot-collections-bar'>
      {hotCollections && (
        <Slider className='hot-collections' {...sliderSettings}>
          {hotCollections.results.map(({ value: collection }, i) => (
            <a
              href={`/collection/${collection.slug}`}
              key={collection.id}
              className='mx-5'
            >
              <div className='hot-collection'>
                <FiArrowUpCircle size={15} color={'green'} />
                {collection.name ? (
                  <p>
                    {isInputHeaderShown
                      ? `${collection.name}`
                      : `${collection.name.substring(0, 15)}...`}
                  </p>
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
