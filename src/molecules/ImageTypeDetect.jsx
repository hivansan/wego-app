import React from 'react';

const ImageTypeDetect = ({ className, imageURL, alt }) => {
  const urlSplit = imageURL
    ? imageURL.split('.')
    : 'https://i.stack.imgur.com/y9DpT.jpg';
  const hasClass = className ? className : '';

  if (
    urlSplit[urlSplit.length - 1] === 'mp4' ||
    urlSplit[urlSplit.length - 1] === 'mov'
  ) {
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
  return (
    <img
      src={
        imageURL === '' || !imageURL
          ? 'https://i.stack.imgur.com/y9DpT.jpg'
          : imageURL
      }
      alt={alt}
      className={hasClass}
      loading='lazy'
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://i.stack.imgur.com/y9DpT.jpg';
      }}
    />
  );
};

export default ImageTypeDetect;
