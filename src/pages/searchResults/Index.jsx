import React, { useEffect, useState, createRef } from 'react';

import { useHistory, useLocation, useParams } from 'react-router-dom';
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

  const getRequest = async (param) => {
    try {
      setResults(null);
      const res = await api.search(param);
      setResults(res);
    } catch (err) {
      throw err;
    }
  };

  const getTrendingItems = async () => {
    setResults(null);
    const res = await api.trending();
    setResults(res);
  };

  const onPressEnter = () => {
    if (param === '') {
      history.push(`/search`);
      setUrl('');
      return getTrendingItems();
    }
    history.push(`/search?q=${encodeURI(param)}`);
    setUrl(param);
    getRequest(param);
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
            return getTrendingItems();
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
    console.log(url);

    if (url === '') {
      //Trending collections or assets and images fetch
      return getTrendingItems();
    }

    getRequest(param);
  }, [url]);

  return (
    <div className='full-search-container'>
      <header className='full-search-header'>
        <h1>
          <strong>NFT</strong> Search
        </h1>
        <SearchInput
          type='text'
          placeholder='Search Nft, Collections, or Keyword'
          onChange={setParam}
          value={param}
          onPressEnter={onPressEnter}
          ref={searchRef}
        />
        {results && results.totalResults && (
          <small>about {results.totalResults} Results</small>
        )}
      </header>

      <FiltersBar />

      <div className='search-results-container'>
        {!results ? (
          <div className='loader-search'>
            <div className='spinner-border'></div>
          </div>
        ) : (
          <div className='results'>
            {results.collections.length === 0 && results.assets.length === 0 ? (
              <div className='no-items-found-container'>
                <div className='no-items-found'>
                  <h3>No items found for this search</h3>
                  <DarkPrimaryButton
                    onClick={() => {
                      history.push('/search');
                      getTrendingItems();
                      setParam('');
                    }}
                  >
                    Back to all Items
                  </DarkPrimaryButton>
                </div>
              </div>
            ) : (
              <>
                <div className='all-results'>
                  {results.collections.map((collection) => (
                    <CollectionResultCard
                      collection={collection}
                      key={collection.address}
                    />
                  ))}
                  {results.assets.map((asset) => (
                    <AssetResultCard
                      asset={asset}
                      key={asset.address}
                      location={location}
                    />
                  ))}
                </div>
                <div className='match-found'>
                  {results.exactMatch && (
                    <ExactMatchCard
                      result={results.exactMatch}
                      className='match'
                    />
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
