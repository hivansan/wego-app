import React, { useEffect, createRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import SearchInput from './SearchInput';
import DarkPrimaryButton from '../atoms/darkPrimaryButton';

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

  const searchRef = createRef();
  const history = useHistory();

  const onPressEnter = () => {
    if (value === '') {
      return history.push(`/search`);
    }

    history.push(`/search?q=${encodeURI(query)}`);
  };

  useEffect(() => {
    searchRef.current.focus();
  }, [value, results]);

  if (value === '') {
    return (
      <div className='search-bar-wrapper' {...props}>
        <div className='search-bar-control'>
          <SearchInput
            type='text'
            placeholder='Search Nft, Collections, or Keyword'
            onChange={onChange}
            value={value}
            ref={searchRef}
            onPressEnter={onPressEnter}
            setDebounceParam={setDebounceParam}
          />
          <small>search collections, top assets, etc</small>
          <DarkPrimaryButton>Search</DarkPrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className='search-bar-wrapper' {...props}>
      <div className='search-bar-control'>
        <div>
          <SearchInput
            type='text'
            placeholder='Search Nft, Collections, or Keyword'
            onChange={onChange}
            ref={searchRef}
            onPressEnter={onPressEnter}
            value={value}
            setDebounceParam={setDebounceParam}
          />
        </div>
        <small>search collections, top assets, etc</small>
        <DarkPrimaryButton>Search</DarkPrimaryButton>
      </div>
      <NftSearchBarModal
        isOpen={isOpen}
        results={results}
        query={query}
        location={location}
      />
    </div>
  );
};

export default SearchBar;
