import React from 'react';

const ImageTypeDetect = ({ className, imageURL, alt }) => {
  const urlSplit = imageURL.split('.');
  const hasClass = className ? className : '';

  if (urlSplit[urlSplit.length - 1] === 'mp4') {
    return (
      <video
        autoPlay
        muted
        controls
        controlsList='nodownload'
        loop
        playsInline
        className='animation'
      >
        <source src={imageURL} type='video/mp4' />
      </video>
    );
  }

  return <img src={imageURL} alt={alt} className={hasClass} />;
};

export default ImageTypeDetect;
