import React from 'react';

import { FaEthereum } from 'react-icons/fa';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

const ExactMatchCard = ({ result, className, ...props }) => {
  const hasExtraClasess = className ? className : '';

  return (
    <div {...props} className={`${hasExtraClasess} exact-match-card`}>
      <header>Exact Match!</header>
      <div className='exact-match-card-info-container'>
        <img src={result.image} alt={result.name} />
        <div className='exact-match-card-info'>
          <p>{result.name}</p>
          <div className='wego-score'>
            <small>WEGO Score</small>
            <p>{result.wegoScore}</p>
          </div>
        </div>
      </div>
      <div className='date-add'>Date added : {result.dateAdded}</div>
      <div className='stats'>
        <div className='stat'>
          <p>ETH Total volume</p>
          <p>
            {result.ethTotalVolume} <FaEthereum size={15} />
          </p>
        </div>
        <div className='stat'>
          <p>Owners</p>
          <p>{result.owners}</p>
        </div>
        <div className='stat'>
          <p>7 day volume</p>
          <p>
            {result.sevenDayVolume} <FaEthereum size={15} />
          </p>
        </div>
        <div className='stat'>
          <p>Total Items</p>
          <p>{result.totalItems}</p>
        </div>
      </div>
      <div className='community-trust'>
        <small>Community trust(781 votes)</small>
        <div className='reactions'>
          <div className='reaction'>
            <AiFillLike size={20} />
            <small>{result.likes}</small>
          </div>
          <div className='reaction'>
            <AiFillDislike size={20} />
            <small>{result.disLikes}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExactMatchCard;
