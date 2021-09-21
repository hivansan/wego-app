import React, { useEffect, createRef, useState, Profiler } from 'react';

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
  const [isModalFocus, setIsModalFocus] = useState(false);

  const searchRef = createRef();
  const dropDownRef = createRef();
  const history = useHistory();

  const onPressEnter = () => {
    if (value === '') {
      return history.push(`/search`);
    }

    history.push(`/search?q=${encodeURI(query)}`);
  };

  useEffect(() => {
    if (value !== '') {
      searchRef.current.focus();
      setIsOpen(true);
    }
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
            dropDownRef={dropDownRef}
            setDropDownOpen={setIsOpen}
            isModalFocus={isModalFocus}
            dropDown={true}
          />
          <small>search collections, top assets, etc</small>
          <DarkPrimaryButton onClick={onPressEnter}>Search</DarkPrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className='search-bar-wrapper' {...props}>
      <div className='search-bar-control'>
        <SearchInput
          type='text'
          placeholder='Search Nft, Collections, or Keyword'
          onChange={onChange}
          ref={searchRef}
          onPressEnter={onPressEnter}
          value={value}
          setDebounceParam={setDebounceParam}
          setDropDownOpen={setIsOpen}
          isModalFocus={isModalFocus}
          dropDown={true}
        />
        <small>search collections, top assets, etc</small>
        <DarkPrimaryButton onClick={onPressEnter}>Search</DarkPrimaryButton>
      </div>
      <NftSearchBarModal
        ref={dropDownRef}
        isOpen={isOpen}
        results={results}
        query={query}
        location={location}
        setIsFocus={setIsModalFocus}
      />
    </div>
  );
};

export default SearchBar;
