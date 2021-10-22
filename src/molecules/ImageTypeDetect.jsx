import React, { useState } from 'react';

const ImageTypeDetect = ({
  className,
  imageURL,
  alt,
  bigImage,
  onLoading,
  bigVideo,
}) => {
  const [ImageIsloaded, setImageIsloaded] = useState(false);

  const urlSplit = imageURL
    ? imageURL.split('.')
    : 'https://i.stack.imgur.com/y9DpT.jpg';
  const hasClass = className ? className : '';

  if (
    urlSplit[urlSplit.length - 1] === 'mp4' ||
    urlSplit[urlSplit.length - 1] === 'mov'
  ) {
    return (
      <>
        {bigVideo ? (
          <>
            {ImageIsloaded ? null : <>{onLoading}</>}
            <video
              autoPlay
              muted
              controlsList='nodownload'
              loop
              style={ImageIsloaded ? {} : { display: 'none' }}
              className={className}
              onLoadedData={() => setImageIsloaded(true)}
            >
              <source src={imageURL} type='video/mp4' />
            </video>
          </>
        ) : (
          <video
            autoPlay
            muted
            controlsList='nodownload'
            loop
            className={className}
          >
            <source src={imageURL} type='video/mp4' />
          </video>
        )}
      </>
    );
  }

  if (bigImage) {
    return (
      <div>
        {ImageIsloaded ? null : <>{onLoading}</>}
        <img
          style={ImageIsloaded ? {} : { display: 'none' }}
          src={
            imageURL === '' || !imageURL
              ? 'https://i.stack.imgur.com/y9DpT.jpg'
              : imageURL
          }
          alt={alt}
          loading='eager'
          onLoad={() => setImageIsloaded(true)}
          className={hasClass}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://i.stack.imgur.com/y9DpT.jpg';
          }}
        />
      </div>
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
      loading='eager'
      className={hasClass}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://i.stack.imgur.com/y9DpT.jpg';
      }}
    />
  );
};

export default ImageTypeDetect;
