import React from 'react';

const LightSecondaryButton = ({ children, style, ...props }) => {
  return (
    <>
      <button
        {...props}
        style={{
          paddingTop: '0.6em',
          paddingBottom: '0.6em',
          paddingLeft: '0.8em',
          paddingRight: '0.8em',
          borderRadius: '0.25em',
          borderWidth: '0.06em',
          borderColor: 'white',
          borderStyle: 'solid',
          color: 'white',
          fontWeight: 'bolder',
          backgroundColor: 'transparent',

          ...style,
        }}
      >
        {children}
      </button>
    </>
  );
};

export default LightSecondaryButton;
