import React from 'react';

const DarkPrimaryButton = ({ children, style, className, ...props }) => {
  const hasExtraClasses = className ? className : '';

  return (
    <button {...props} className={`${hasExtraClasses} dark-primary-btn`}>
      {children}
    </button>
  );
};

export default DarkPrimaryButton;
