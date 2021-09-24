import React, { useState } from 'react';

import { FiFilter } from 'react-icons/fi';
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Filter from './Filter';

const CollectionAssetsFilters = ({ isCollapse, setCollapse }) => {
  const setIsCollapse = () => setCollapse(!isCollapse);

  const [statusCollapse, setStatusCollapse] = useState(true);
  const [priceCollapse, setPriceCollapse] = useState(true);

  if (isCollapse) {
    return (
      <div className='filter-collapse collection-assets-filters'>
        <header onClick={setIsCollapse}>
          <BiArrowToRight size={20} />
        </header>
      </div>
    );
  }

  return (
    <div className='collection-assets-filters'>
      <header onClick={setIsCollapse}>
        <div className='header-collapsed-off'>
          <div className='header-action-collapse'>Filter</div>
        </div>
        <BiArrowToLeft size={20} />
      </header>

      <Filter
        title='Status'
        isCollapsed={statusCollapse}
        setIsCollapsed={setStatusCollapse}
      ></Filter>
      <Filter
        title='Price'
        isCollapsed={priceCollapse}
        setIsCollapsed={setPriceCollapse}
      ></Filter>
    </div>
  );
};

export default CollectionAssetsFilters;
