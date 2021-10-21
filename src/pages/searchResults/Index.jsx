import React, { useEffect, useState, createRef } from 'react';

import { useHistory, useLocation, Link, useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import ReactPaginate from 'react-paginate';
import SearchInput from '../../molecules/SearchInput';

import useQuery from '../../atoms/hooks/useQuery';

import ExactMatchCard from '../../molecules/ExactMatchCard';
import CollectionResultCard from '../../molecules/CollectionResultCard';
import AssetResultCard from '../../molecules/AssetResultCard';

import FiltersBar from './FiltersBar';

import Paginator from '../../molecules/Paginator';

import DarkPrimaryButton from '../../atoms/darkPrimaryButton';

const SearchScreen = () => {
  const api = new Api();
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();
  const searchRef = createRef();
  const prevQuery = query.get('q');
  const page = query.get('page');
  const q = !prevQuery ? '' : prevQuery;
  const urlTab = query.get('tab');

  const [param, setParam] = useState(q);
  const [results, setResults] = useState(null);
  const [locationKeys, setLocationKeys] = useState([]);
  const [tab, setTab] = useState(urlTab || 'all');

  const [url, setUrl] = useState({ query: q, page, tab: urlTab });

  const getRequest = async (param, page, tab) => {
    setResults(null);
    try {
      const res = await api.search(param, page, tab);
      console.log(res);
      setResults(res);
    } catch (err) {
      throw err;
    }
  };

  const onPressEnter = () => {
    const selectedTab = tab === 'all' ? '' : `&tab=${tab}`;

    if (param === '') {
      history.push(`/search?page=1${selectedTab}`);
      return setUrl({ query: '', page: 1, tab });
    }
    history.push(`/search?q=${encodeURI(param)}&page=1${selectedTab}`);
    setUrl({ query: param, page: 1, tab });
  };

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key]);
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          // Handle forward event
          setLocationKeys((keys) => [location.key, ...keys]);
          const params = new URLSearchParams(location.search);
          const query = params.get('q') || '';
          const page = params.get('page');
          const tab = params.get('tab') || 'all';
          console.log(page);
          setUrl({ query, page, tab });
          setParam(query);
          window.location.reload(false);
        } else {
          // Handle back event
          setLocationKeys((keys) => [location.key, ...keys]);
          const params = new URLSearchParams(location.search);
          const query = params.get('q') || '';
          const page = parseInt(params.get('page'));
          const tab = params.get('tab') || 'all';
          if (url.query === query && url.page === page && url.tab === tab) {
            return false;
          }

          setUrl({ query, page, tab });
          setParam(query);
        }
      }
    });
  }, [locationKeys]);

  useEffect(() => {
    getRequest(url.query, url.page, tab);
    return () => {
      setResults(null);
    };
  }, [url]);

  return (
    <div className='full-search-container'>
      <header className='full-search-header'>
        <Link to='/'>
          <img
            src={require('../../assets/logo/blue&gray.png').default}
            alt=''
          />
        </Link>
        <SearchInput
          type='text'
          placeholder='Search NFT, Collections, or Keyword'
          onChange={setParam}
          value={param}
          onPressEnter={onPressEnter}
          ref={searchRef}
        />
        {results && <small>about {results?.meta?.total} Results</small>}
      </header>

      <FiltersBar
        tab={tab}
        setTab={setTab}
        setUrl={setUrl}
        url={url}
        param={param}
      />
      <div className='search-results-container'>
        {!results ? (
          <div className='loader-search'>
            <div className='spinner-border'></div>
          </div>
        ) : (
          <div className='results'>
            {results.results.length === 0 ? (
              <div className='no-items-found-container'>
                <div className='no-items-found'>
                  <h3>No items found for this search</h3>
                  <DarkPrimaryButton
                    onClick={() => {
                      setParam('');
                      history.push(`/search?page=1`);
                      setUrl({ query: '', page: 1 });
                    }}
                  >
                    Back to all Items
                  </DarkPrimaryButton>
                </div>
              </div>
            ) : (
              <>
                <div className='match-found mobile-match'>
                  <ExactMatchCard
                    results={results}
                    className='match'
                    location={location}
                  />
                </div>
                <div className='all-results'>
                  {results.results.map((result, i) => {
                    if (result.meta.index === 'collections') {
                      return (
                        <CollectionResultCard
                          result={result}
                          key={i}
                          location={location}
                        />
                      );
                    } else {
                      return (
                        <AssetResultCard
                          result={result}
                          key={i}
                          location={location}
                        />
                      );
                    }
                  })}
                </div>
                <div className='match-found desktop-match'>
                  <ExactMatchCard
                    results={results}
                    className='match'
                    location={location}
                  />
                </div>{' '}
              </>
            )}
          </div>
        )}
      </div>
      {results && results.results.length > 0 && (
        <div className='paginator-wrapper'>
          <Paginator
            limit={20}
            totalItems={results.meta.total}
            onPageChange={({ selected: selectedPage }) => {
              const selectedTab = tab === 'all' ? '' : `&tab=${tab}`;
              if (param === '') {
                history.push(`/search?page=${selectedPage + 1}${selectedTab}`);
                setUrl({ query: '', page: selectedPage + 1, tab });
                return window.location.reload(false);
              }
              history.push(
                `/search?q=${encodeURI(param)}&page=${
                  selectedPage + 1
                }${selectedTab}`
              );
              setUrl({
                query: url.query,
                page: selectedPage + 1,
                tab,
              });
              window.location.reload(false);
            }}
            forcePage={parseInt(url.page)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
