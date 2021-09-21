import React from 'react';
import { FaTwitter, FaDiscord, FaInstagram, FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BsLink45Deg } from 'react-icons/bs';

const Footer = (props) => {
  return (
    <footer className='footer'>
      {/* <div className='footer-container'>
        <h1>Stay in the loop</h1>
        <div className='footer-info'>
          <div className='newsletter'>
            <p>
              Register with us to receive the best deals on your e-mail do not
              loose the chance to invest on the hottest art out there
            </p>
            <form>
              <input type='text' placeholder='e-mail' />
              <button>Register</button>
            </form>
          </div>

          <div className='socials'>
            Follow us on social:
            <div className='icons'>
              <BsLink45Deg size={50} />
              <FaDiscord size={40} />
              <FaTwitter size={40} />
              <FaInstagram size={40} />
            </div>
          </div>
        </div>
      </div> */}
      <div className='footer-c'>
        <div>
          <Link to='/#'>Terms of services</Link>
          <Link to='/#'>Terms of services</Link>
        </div>
        <div className='socials'>
          <div className='icons'>
            <a href='https://wegobattle.com'>
              <FaLink size={35} />
            </a>
            <a href='https://discord.com/invite/MDgmGTJFkD'>
              <FaDiscord size={40} />
            </a>
            <a href='https://twitter.com/wegobattle'>
              <FaTwitter size={40} />
            </a>
            <a href='/#'>
              <FaInstagram size={40} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
