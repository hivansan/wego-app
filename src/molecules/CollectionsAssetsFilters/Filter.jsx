import React, { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Filter = ({ title, children, counter }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const setCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='filter'>
      <div className='filter-header' onClick={setCollapsed}>
        <p>{title}</p>
        <div className='filter-counter'>
          <span>
            {counter}
          </span>
          {isCollapsed ? (
            <IoIosArrowDown size={20} />
          ) : (
            <IoIosArrowUp size={20} />
          )}
        </div>
      </div>
      {isCollapsed ? (
        <div className='filter-body'>{children}</div>
      ) : (
        <div className='filter-body d-none'>{children}</div>
      )}
    </div>
  );
};

export default Filter;
