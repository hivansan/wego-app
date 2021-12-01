import { Link } from 'react-router-dom';

const NftSearchBarModal = ({ results, isOpen, query, children, className, noItemsFound }) => {
  const hasExtraClasses = className ? className : '';
  const modalIsOpen = isOpen ? '' : 'd-none';

  return (
    <div className={`search-bar-drop-down ${modalIsOpen} ${hasExtraClasses}`}>
      {!results ? (
        <div className='loader-container'>
          <div className='spinner-border'></div>
        </div>
      ) : (
        <>
          {results.results && results.results.length === 0 ? (
            <>
              {noItemsFound || (
                <div className='loader-container'>
                  {' '}
                  <h1>No items found</h1>{' '}
                </div>
              )}
            </>
          ) : (
            <>
              {children}
              <Link to={`/search?q=${encodeURI(query)}`}>
                <div className='drop-down-footer'>Show all results</div>
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NftSearchBarModal;
