import React, { useEffect, useState, createRef } from 'react';

import { useHistory, useLocation, Link } from 'react-router-dom';
import { Api } from '../../services/api';

import SearchInput from '../../molecules/SearchInput';

import useQuery from '../../atoms/hooks/useQuery';

import ExactMatchCard from '../../molecules/ExactMatchCard';
import CollectionResultCard from '../../molecules/CollectionResultCard';
import AssetResultCard from '../../molecules/AssetResultCard';

import FiltersBar from './FiltersBar';

import DarkPrimaryButton from '../../atoms/darkPrimaryButton';

const SearchScreen = () => {
  const api = new Api();
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();
  const searchRef = createRef();
  const prevQuery = query.get('q');

  const q = !prevQuery ? '' : prevQuery;

  const [param, setParam] = useState(q);
  const [url, setUrl] = useState(q);
  const [results, setResults] = useState(null);
  const [locationKeys, setLocationKeys] = useState([]);

  const getRequest = async (p) => {
    try {
      const res = await api.search(p);
      setResults(res);
    } catch (err) {
      throw err;
    }
  };

  const onPressEnter = () => {
    if (param === '') {
      history.push(`/search`);
      return setUrl('');
    }
    history.push(`/search?q=${encodeURI(param)}`);
    setUrl(param);
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
          const q = new URLSearchParams(location.search);
          const hasQuery = location.search === '' ? '' : q.get('q');
          setParam(hasQuery);
          if (hasQuery === '') {
            return getRequest('');
          }
          getRequest(hasQuery);
        } else {
          // Handle back event
          setLocationKeys((keys) => [location.key, ...keys]);
          const q = new URLSearchParams(location.search);
          const hasQuery = location.search === '' ? '' : q.get('q');
          setUrl(hasQuery);
          setParam(hasQuery);
        }
      }
    });
  }, [locationKeys]);

  useEffect(() => {
    getRequest(url);
    window.scrollTo(0, 0);
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
          placeholder='Search Nft, Collections, or Keyword'
          onChange={setParam}
          value={param}
          onPressEnter={onPressEnter}
          ref={searchRef}
        />
        {results && <small>about {results.meta.total} Results</small>}
      </header>

      <FiltersBar />

      <div className='search-results-container'>
        {!results ? (
          <div className='loader-search'>
            <div className='spinner-border'></div>
          </div>
        ) : (
          <div className='results'>
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
                      key={result.value.id}
                      location={location}
                    />
                  );
                } else {
                  return (
                    <AssetResultCard
                      result={result}
                      key={result.value.id + i}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
