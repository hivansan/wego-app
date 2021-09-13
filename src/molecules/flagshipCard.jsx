import React from 'react';

import { Link } from 'react-router-dom';

const FlagshipCard = ({
  piece = 'https://via.placeholder.com/480x480.png?text=Flagship Collection',
  userPhoto = 'https://via.placeholder.com/60x60',
  userName = 'User name',
  pieceName = 'Piece name',
  location,
  ...props
}) => {
  return (
    <div {...props}>
      <div className='asset-container'>
        <div className='card-img'>
          <img src={piece} alt='' />
        </div>
      </div>
      <div className='card-details'>
        <img src={userPhoto} alt='profile pic' />

        <div className='card-info'>
          <p>{pieceName}</p>
          <p>{userName}</p>
        </div>
      </div>
    </div>
  );
};

export default FlagshipCard;
