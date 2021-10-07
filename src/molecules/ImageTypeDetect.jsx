import React from 'react';

const ImageTypeDetect = ({ className, imageURL, alt }) => {
  const urlSplit = imageURL && imageURL.split('.');
  const hasClass = className ? className : '';

  if (!imageURL) {
    return (
      <img
        src='https://i.stack.imgur.com/y9DpT.jpg'
        alt=''
        className={className}
      />
    );
  }

  if (urlSplit[urlSplit.length - 1] === 'mp4') {
    return (
      <video
        autoPlay
        muted
        controlsList='nodownload'
        loop
        playsInline
        className={className}
      >
        <source src={imageURL} type='video/mp4' />
      </video>
    );
  }

  return <img src={imageURL} alt={alt} className={hasClass} loading='lazy' />;
};

export default ImageTypeDetect;
