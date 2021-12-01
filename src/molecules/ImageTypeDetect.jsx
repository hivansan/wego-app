import { useState } from 'react';

const ImageTypeDetect = ({ className, imageURL, alt, bigImage, onLoading, bigVideo, }) => {
  const [ImageIsloaded, setImageIsloaded] = useState(false);


  const urlSplit = imageURL
    ? imageURL.split('.')
    : 'https://i.stack.imgur.com/y9DpT.jpg';
  const hasClass = className ? className : '';

  if (['mp4', 'mov'].includes(urlSplit[urlSplit.length - 1])) {
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
              className={hasClass}
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
            className={hasClass}
          >
            <source src={imageURL} type='video/mp4' />
          </video>
        )}
      </>
    );
  }

  //  AUDIO RENDER
  if (urlSplit[urlSplit.length - 1] === 'mp3') {
    return (
      <>
        {onLoading}
        <audio controls>
          <source src={imageURL} type='audio/mp3' />
          Your browser does not support the audio element.
        </audio>
      </>
    );
  }

  // BIG PICTURE RENDER
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

  //NORMAL PICTURE RENDER
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
