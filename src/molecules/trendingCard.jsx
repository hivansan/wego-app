import React from 'react';
import { FaEthereum } from 'react-icons/fa';

import { BLUE, GREY } from '../elements/colors';
import LightSecondaryButton from '../atoms/ligthSecondaryButton';
import CalendarButton from '../atoms/calendarButton';

const TrendingCard = ({
  piece = 'https://via.placeholder.com/720x720.png?text=Upcoming Collection',
  userPhoto = 'https://via.placeholder.com/60x60',
  userName = 'User name',
  title = 'Collection name',
  date = '24 jul 2021',
  owners = 316,
  website = '',
  totalVolume = 10.7,
  price = {
    top: 1,
    bottom: 0.1,
  },
  amountNfts = 0,
  ...props
}) => {
  const isLive = new Date() > date;
  const link = '/collection/:id'; // TODO: change this for the actual link id

  return (
    <div className='trend-card'>
      <header className='trend-card-header'>Featured</header>
      <div className='trend-card-img'>
        <img src={piece} alt='' />
      </div>
      <div className='trend-card-body'>
        <div className='trend-card-info'>
          <img src={userPhoto} alt='use pic' />
          <div>
            <h5>{title}</h5>
            <div>
              <p>
                Added: <small>{date}</small>
              </p>
              <p>
                Owners: <small>{owners}</small>
              </p>
              <p>
                Total volume: <small>{`${totalVolume} ETH`}</small>
              </p>
            </div>
          </div>
        </div>
        <div className='trend-card-desc'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
            voluptatem? Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Neque, voluptatem? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Neque, voluptatem?
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
