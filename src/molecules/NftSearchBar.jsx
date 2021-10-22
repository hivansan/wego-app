import React, { useEffect, createRef, useState, Profiler } from 'react';

import { useHistory } from 'react-router-dom';
import SearchInput from './SearchInput';
import DarkPrimaryButton from '../atoms/darkPrimaryButton';
import ExactMatchCard from './ExactMatchCard';
import DropDownCollections from './DropDownCollections';
import DropDownAssets from './DropDownAssets';

import NftSearchBarModal from './NftSearchBarModal';

const SearchBar = ({
  onChange,
  setDebounceParam,
  value,
  results,
  query,
  location,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const searchRef = createRef();

  const history = useHistory();

  const onPressEnter = () => {
    if (value === '') {
      return history.push(`/search?page=1`);
    }

    history.push(`/search?q=${encodeURI(query)}&page=1`);
  };

  useEffect(() => {
    const isSearchResultsOpen = localStorage.getItem('sR');

    if (isSearchResultsOpen) {
      setIsOpen(true);
    }
  }, [location]);

  useEffect(() => {
    if (value !== '') {
      searchRef.current.focus();
      setIsOpen(true);
    }
  }, [value, results]);

  const setBlur = () => {
    setIgnoreBlur(true);
  };

  const clearIgnoreBlur = () => {
    setIgnoreBlur(false);
  };

  const handleBlur = () => {
    if (ignoreBlur) return;
    setIsOpen(false);
  };

  const onFocusInput = () => {
    if (value !== '') {
      setIsOpen(true);
    }
  };

  return (
    <div
      className='search-bar-wrapper'
      {...props}
      onMouseDown={setBlur}
      onMouseUp={clearIgnoreBlur}
      onMouseOut={clearIgnoreBlur}
      onBlur={handleBlur}
    >
      <div className='search-bar-control'>
        <SearchInput
          type='text'
          placeholder='Search NFT, Collections, or Keyword'
          onChange={onChange}
          value={value}
          ref={searchRef}
          onPressEnter={onPressEnter}
          setDebounceParam={setDebounceParam}
          setDropDownOpen={setIsOpen}
          onFocus={onFocusInput}
        />
        <small>search collections, top assets, etc</small>
        <DarkPrimaryButton onClick={onPressEnter}>Search</DarkPrimaryButton>
      </div>
      {value !== '' && (
        <NftSearchBarModal
          isOpen={isOpen}
          results={results}
          query={query}
          location={location}
          noItemsFound={
            <div className='search-bar-no-items-found'>
              No items found for this search
            </div>
          }
        >
          {results && (
            <>
              <div className='large-table-match'>
                <ExactMatchCard
                  results={results}
                  className='match mobile-match'
                  location={location}
                  isOpen={isOpen}
                />
              </div>
              <div className='drop-down-results'>
                <ExactMatchCard
                  results={results}
                  className='match mobile-match'
                  location={location}
                  isOpen={isOpen}
                />

                <DropDownCollections results={results} />
                <DropDownAssets
                  results={results}
                  location={location}
                  isOpen={isOpen}
                />
                <ExactMatchCard
                  results={results}
                  className='match desktop-match'
                  location={location}
                  isOpen={isOpen}
                />
              </div>
            </>
          )}
        </NftSearchBarModal>
      )}
    </div>
  );
};

export default SearchBar;
