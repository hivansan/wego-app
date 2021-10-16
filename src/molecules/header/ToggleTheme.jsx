import React, { useEffect, useState } from 'react';

const ToggleTheme = ({ className }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const hasExtraClasses = className ? className : '';

  useEffect(() => {
    document.body.setAttribute('theme', theme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const toggleTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(toggleTheme);
  };

  return (
    <div className={`${hasExtraClasses} theme-toggle`} onClick={toggleTheme}>
      {theme === 'light' ? <>☀️</> : <>🌙</>}
    </div>
  );
};

export default ToggleTheme;
