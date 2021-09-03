import React from 'react';
import { FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa';
import { BsLink45Deg } from 'react-icons/bs';
import { BLUE } from '../elements/colors';

const Footer = (props) => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
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
      </div>
      <div className='footer-terms'>
        <p>Terms of services</p>|<p>Privacy policy</p>
      </div>
    </footer>
  );
};

export default Footer;
