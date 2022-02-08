import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const FavoriteButton = ({ children, style, className, isFavorite, setIsFavorite, ...props }) => {
  const hasExtraClasses = className ? className : '';

  return (
    <button {...props} className={`${hasExtraClasses} favorite-btn`} onClick={() => setIsFavorite(!isFavorite)}>
      {children}

      {isFavorite && (
        <div className='favorite-toggled'><Favorite /></div>
      )}
      
      {!isFavorite && (
        <div className='favorite-untoggled'><FavoriteBorder /></div>
      )}


    </button>
  );
};

export default FavoriteButton;
