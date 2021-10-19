import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';

const settings = {
  arrows: false,
  slidesToScroll: 1,
  pauseOnHover: true,
  slidesToShow: 3,
  customPaging: function () {
    return <button className='dots'></button>;
  },
  dots: true,
  dotsClass: 'slick-dots slick-thumb',
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 857,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function SlickSlider({ children, ...props }) {
  return (
    <Slider {...settings} {...props} pauseOnHover={true}>
      {children.map((x, i) => (
        <div className='w-75 d-flex justify-content-center' key={i}>
          {x}
        </div>
      ))}
    </Slider>
  );
}
