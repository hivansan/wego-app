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

  const searchRef = createRef();

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
            setDropDownOpen={setIsOpen}
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
        />
        <small>search collections, top assets, etc</small>
        <DarkPrimaryButton onClick={onPressEnter}>Search</DarkPrimaryButton>
      </div>
      <NftSearchBarModal
        isOpen={isOpen}
        results={results}
        query={query}
        location={location}
      >
        {results && (
          <>
            <div className='large-table-match'>
              {results.exactMatch && (
                <ExactMatchCard
                  result={results.exactMatch}
                  className='match mobile-match'
                  location={location}
                />
              )}
            </div>
            <div className='drop-down-results'>
              {results.exactMatch && (
                <ExactMatchCard
                  result={results.exactMatch}
                  className='match mobile-match'
                  location={location}
                />
              )}

              <DropDownCollections results={results.collections} />
              <DropDownAssets results={results.assets} location={location} />
              {results.exactMatch && (
                <ExactMatchCard
                  result={results.exactMatch}
                  className='match desktop-match'
                  location={location}
                />
              )}
            </div>{' '}
          </>
        )}
      </NftSearchBarModal>
    </div>
  );
};

export default SearchBar;
