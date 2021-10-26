import React, { forwardRef } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';

const settings = {
  arrows: false,
  dots: false,
};

const SlickSlider = forwardRef(({ children, ...props }, ref) => {
  return (
    <Slider {...settings} {...props} ref={ref}>
      {children.map((x, i) => (
        <div className='' key={i}>
          {x}
        </div>
      ))}
    </Slider>
  );
});

export default SlickSlider;
