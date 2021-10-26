import React from 'react';

import DarkPrimaryButton from '../atoms/darkPrimaryButton';
import { useHistory } from 'react-router-dom';

import { FaGhost } from 'react-icons/fa';

const Error404 = () => {
  const history = useHistory();

  return (
    <>
      <div className='error-404-container'>
        <h1>
          4
          <span>
            <FaGhost />
          </span>
          4
        </h1>

        <h3>Page not found</h3>
        <p>The resource request could not be found</p>

        <DarkPrimaryButton onClick={() => history.push('/')}>
          GO TO HOME PAGE
        </DarkPrimaryButton>
      </div>
    </>
  );
};

export default Error404;
