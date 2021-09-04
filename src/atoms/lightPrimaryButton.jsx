import React from 'react';

const DarkPrimaryButton = ({ children, className, ...props }) => {
  const hasExtraClasses = className ? className : '';
  return (
    <button {...props} className={`${hasExtraClasses} light-primary-btn`}>
      {children}
    </button>
  );
};

export default DarkPrimaryButton;
