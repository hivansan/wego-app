import React, { useState } from 'react';
import ToolsBar from './ToolsBar';

const FiltersBar = () => {
  const [isToolsBarOpen, setIsToolsBarOpen] = useState(false);

  return (
    <>
      <div className='search-filters'>
        <ul>
          <li className='active'>All</li>
          <li>Images</li>
          <li>Collections</li>
          <li>Assets</li>
          <li>Market overview</li>
          <li>Price change</li>
          <li>Owners</li>
          <li>Release date</li>
        </ul>
        <div
          className='toggle-tools'
          onClick={() => setIsToolsBarOpen(!isToolsBarOpen)}
        >
          <p>Tools</p>
        </div>
      </div>

      <ToolsBar isToolsBarOpen={isToolsBarOpen} />
    </>
  );
};

export default FiltersBar;
