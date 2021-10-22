import React, { useState, useEffect, createRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Slider from '../molecules/Slider';

import { FiArrowUpCircle } from 'react-icons/fi';
import ImageTypeDetect from './ImageTypeDetect';

const HotCollectionsBar = ({ hotCollections, isInputHeaderShown }) => {
  const widthCollectionsBar = isInputHeaderShown ? 7 : 7;

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const isTablet = useMediaQuery({ query: '(max-width : 1200px)' });
  const sliderRef = createRef();
  const [pause, setPause] = useState(true);

  const isInputShow = isInputHeaderShown
    ? 'hot-bar-lg'
    : isMobile
    ? 'hot-bar-normal'
    : 'hot-bar-lg';

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: widthCollectionsBar,
    slidesToScroll: 1,
    autoplay: pause,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1295,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
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
  const stop = () => {
    sliderRef.current.slickPause();
  };
  const play = () => {
    sliderRef.current.slickPlay();
  };

  return (
    <div
      className={`${isInputShow} hot-collections-bar`}
      onMouseOver={stop}
      onMouseLeave={play}
    >
      {hotCollections && (
        <Slider className='hot-collections' {...sliderSettings} ref={sliderRef}>
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
                <ImageTypeDetect
                  imageURL={collection.imgMain}
                  alt={collection.name}
                  className='h-collection-img'
                />
              </div>
            </a>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HotCollectionsBar;
