import React, { useState, useEffect } from 'react';
import ToolsBar from './ToolsBar';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useHistory } from 'react-router-dom';

const FiltersBar = ({ tab, setTab, setUrl, url, param }) => {
  const [isToolsBarOpen, setIsToolsBarOpen] = useState(false);
  const [activeClass, setActiveClass] = useState('');
  const history = useHistory();

  const handleTabClick = (e) => {
    const tabContent = e.target.textContent.toLowerCase();
    setTab(tabContent);

    const selectedTab = tabContent === 'all' ? '' : `&tab=${tabContent}`;

    if (param === '') {
      history.push(`/search?page=${1}${selectedTab}`);
      return setUrl({ query: '', page: 1, tab: tabContent });
    }
    history.push(`/search?q=${encodeURI(param)}&page=${1}${selectedTab}`);
    setUrl({
      query: url.query,
      page: 1,
      tab: tabContent,
    });
  };

  return (
    <>
      <ScrollContainer className='full-search-filters'>
        <ul>
          <li
            className={`${tab === 'all' ? 'active' : ''}`}
            onClick={handleTabClick}
          >
            All
          </li>
          <li
            className={`${tab === 'collections' ? 'active' : ''}`}
            onClick={handleTabClick}
          >
            Collections
          </li>
          <li
            className={`${tab === 'assets' ? 'active' : ''}`}
            onClick={handleTabClick}
          >
            Assets
          </li>
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
