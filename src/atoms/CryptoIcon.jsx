import React, { useState, useEffect } from 'react';
import Icon from 'react-crypto-icons';

const CryptoIcon = ({ token }) => {
  const [showSymbol, setShowSymbol] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  const wrappedTokens = () => {
    const tokenSymbol = token.toLowerCase();
    const splitToken = tokenSymbol.split('');
    const wrappedToken = splitToken.shift();

    if (wrappedToken === 'w') {
      return [splitToken.join(''), 'red'];
    }
    return [tokenSymbol, 'secondary'];
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setShowSymbol(false);
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className='token-c'
      onMouseEnter={() => setShowSymbol(true)}
      onMouseLeave={() => setShowSymbol(false)}
    >
      {showSymbol && <div className='token-symbol'>{token}</div>}
      <Icon
        name={wrappedTokens()[0]}
        size={14}
        className={`token token-${wrappedTokens()[1]}`}
      />
    </div>
  );
};

export default CryptoIcon;
//
