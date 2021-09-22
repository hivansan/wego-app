import React from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Filter = ({ title, isCollapsed, setIsCollapsed, children }) => {
  const setCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='filter'>
      <div className='filter-header' onClick={setCollapsed}>
        <p>{title}</p>
        {isCollapsed ? (
          <IoIosArrowDown size={20} />
        ) : (
          <IoIosArrowUp size={20} />
        )}
      </div>
      {isCollapsed && <div className='filter-body'>{children}</div>}
    </div>
  );
};

export default Filter;
