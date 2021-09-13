import React from 'react';

import { Link } from 'react-router-dom';
import ExactMatchCard from './ExactMatchCard';
import DropDownCollections from './DropDownCollections';
import DropDownAssets from './DropDownAssets';

const NftSearchBarModal = ({ results, isOpen, setIsOpen, query, location }) => {
  const modalIsOpen = isOpen ? 'd-none' : '';

  return (
    <div className={`search-bar-drop-down ${modalIsOpen}`}>
      {!results ? (
        <div className='loader-container'>
          <div className='spinner-border'></div>
        </div>
      ) : (
        <>
          <div className='drop-down-results'>
            <DropDownCollections results={results.collections} />
            <DropDownAssets results={results.assets} location={location} />
            <ExactMatchCard result={results.exactMatch} location={location} />
          </div>
          <Link to={`/search?q=${encodeURI(query)}`}>
            <div className='drop-down-footer'>Show all results</div>
          </Link>
        </>
      )}
    </div>
  );
};

export default NftSearchBarModal;
