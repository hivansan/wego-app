import React, { forwardRef } from 'react';

import { Link } from 'react-router-dom';
import ExactMatchCard from './ExactMatchCard';
import DropDownCollections from './DropDownCollections';
import DropDownAssets from './DropDownAssets';

const NftSearchBarModal = forwardRef(
  ({ results, isOpen, setIsOpen, query, location, setIsFocus }, ref) => {
    const modalIsOpen = isOpen ? '' : 'd-none';

    return (
      <div
        className={`search-bar-drop-down ${modalIsOpen}`}
        ref={ref}
        onFocus={() => setIsFocus(true)}
        onClick={(e) => {
          e.stopPropagation();
          setIsFocus(true);
        }}
        onBlur={() => setIsFocus(false)}
        onMouseOver={() => setIsFocus(true)}
        onMouseLeave={() => setIsFocus(false)}
      >
        {!results ? (
          <div className='loader-container'>
            <div className='spinner-border'></div>
          </div>
        ) : (
          <>
            {results.collections.length === 0 && results.assets.length === 0 ? (
              <div className='loader-container'>
                <h1>No items found</h1>
              </div>
            ) : (
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
                  <DropDownAssets
                    results={results.assets}
                    location={location}
                  />
                  {results.exactMatch && (
                    <ExactMatchCard
                      result={results.exactMatch}
                      className='match desktop-match'
                      location={location}
                    />
                  )}
                </div>
                <Link to={`/search?q=${encodeURI(query)}`}>
                  <div className='drop-down-footer'>Show all results</div>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    );
  }
);

export default NftSearchBarModal;
