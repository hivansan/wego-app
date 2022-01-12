import { useState } from 'react';

const VIDEO_FORMATS = ['mp4', 'mov', 'webm'];
const AUDIO_FORMATS = ['mp3', 'wav', 'ogg'];
//const IMAGE_FORMATS = ['png', 'jpg', 'gif', 'svg'];
const ANIMATION_3D_FORMATS = ['glb', 'gltf'];

const ImageTypeDetect = ({ className, imageURL, alt, bigImage, onLoading, bigVideo, animationFallbackURL }) => {
  const [ImageIsloaded, setImageIsloaded] = useState(false);


  const urlSplit = imageURL
    ? imageURL.toLowerCase().split('.')
    : 'https://i.stack.imgur.com/y9DpT.jpg';
  const hasClass = className ? className : '';

  // For future reference, this article explains how to implement glb support:
  // https://uxdesign.cc/make-your-react-websites-fun-by-adding-interactive-3d-objects-1e1d672887e7

  if (VIDEO_FORMATS.includes(urlSplit[urlSplit.length - 1])) {
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
  if (AUDIO_FORMATS.includes(urlSplit[urlSplit.length - 1])) {
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

  if (ANIMATION_3D_FORMATS.includes(urlSplit[urlSplit.length - 1])) {
    // Not supported so it goes directly to fallback images
    return (
      <div>
        {ImageIsloaded ? null : <>{onLoading}</>}
        <img
          style={ImageIsloaded ? {} : { display: 'none' }}
          src={
            animationFallbackURL === '' || !animationFallbackURL
              ? 'https://i.stack.imgur.com/y9DpT.jpg'
              : animationFallbackURL
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
