import React, { useState } from 'react';
import ToolsBar from './ToolsBar';
import ScrollContainer from 'react-indiana-drag-scroll';

const FiltersBar = () => {
  const [isToolsBarOpen, setIsToolsBarOpen] = useState(false);

  return (
    <>
      <ScrollContainer className='search-filters'>
        <ul>
          <li className='active'>All</li>
          <li>Collections</li>
          <li>Assets</li>
          {/* <li>
            <div
              className='toggle-tools'
              onClick={() => setIsToolsBarOpen(!isToolsBarOpen)}
            >
              <p>Tools</p>
            </div>
          </li> */}
        </ul>
      </ScrollContainer>

      {/* <ToolsBar isToolsBarOpen={isToolsBarOpen} /> */}
    </>
  );
};

export default FiltersBar;
