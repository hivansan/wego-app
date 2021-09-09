import React, { useEffect, useState, createRef } from 'react';
import { RiToolsLine } from 'react-icons/ri';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import { useHistory } from 'react-router-dom';
import { Api } from '../../services/api';

import { useDebounce } from '../../atoms/hooks/useStateDebounce';
import SearchInput from '../../molecules/SearchInput';

import useQuery from '../../atoms/hooks/useQuery';

import ExactMatchCard from '../../molecules/ExactMatchCard';
import CollectionResultCard from '../../molecules/CollectionResultCard';
import AssetResultCard from '../../molecules/AssetResultCard';

const SearchScreen = () => {
  const api = new Api();
  const query = useQuery();
  const history = useHistory();
  const searchRef = createRef();
  const prevQuery = query.get('q');

  const [isTypeToolsOpen, setIsTypeToolsOpen] = useState(false);
  const [isSizeToolsOpen, setIsSizeToolsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [param, setParam] = useState(prevQuery);
  const [debounceParam, setDebounceParam] = useDebounce(param, 500);
  const [results, setResults] = useState(null);
  const [locationKeys, setLocationKeys] = useState([]);

  const typeOptions = ['JPG', 'PNG', 'GIF', 'SVG', 'MP4'];
  const sizeOption = ['Large', 'Medium', 'Small'];

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key]);
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          // Handle forward event
          const q = new URLSearchParams(location.search);
          setParam(q.get('q'));
        } else {
          // Handle back event
          const q = new URLSearchParams(location.search);
          setLocationKeys((keys) => [location.key, ...keys]);
          setParam(q.get('q'));
        }
      }
    });
  }, [locationKeys]);

  const getRequest = async () => {
    try {
      setResults(null);
      const res = await api.search(debounceParam);
      setResults(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    history.push(`/search?q=${encodeURI(param)}`);
    if (param.length === 0) {
      history.push(`/search`);
      return true;
    }

    if (debounceParam.length > 0) {
      getRequest();
    }
  }, [param, debounceParam]);

  const onPressEnter = () => {
    getRequest();
  };

  return (
    <div className='full-search-container'>
      <header className='full-search-header'>
        <h1>
          <strong>NFT</strong> Search
        </h1>
        <SearchInput
          setDebounceParam={setDebounceParam}
          type='text'
          placeholder='Search Nft, Collections, or Keyword'
          onChange={setParam}
          value={param}
          onPressEnter={onPressEnter}
          ref={searchRef}
        />
        <small>About 450 results</small>
      </header>
      <div className='search-filters'>
        <ul>
          <li className='active'>All</li>
          <li>Images</li>
          <li>Collections</li>
          <li>Assets</li>
          <li>Market overview</li>
          <li>Price change</li>
          <li>Owners</li>
          <li>Release date</li>
        </ul>
        <div
          className='toggle-tools'
          onClick={() => setIsToolsOpen(!isToolsOpen)}
        >
          <p>Tools</p>
        </div>
      </div>

      {/* /// molecule component */}

      {isToolsOpen && (
        <div className='tools'>
          <div
            className='tool'
            onClick={() => setIsTypeToolsOpen(!isTypeToolsOpen)}
          >
            <p>
              Type{' '}
              {isTypeToolsOpen ? (
                <AiFillCaretUp size={12} />
              ) : (
                <AiFillCaretDown size={12} />
              )}
            </p>
            {isTypeToolsOpen && (
              <div className='drop-down-tool'>
                <ul>
                  {typeOptions.map((type) => (
                    <li key={type} onClick={() => alert(type)}>
                      <small>{type}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div
            className='tool'
            onClick={() => setIsSizeToolsOpen(!isSizeToolsOpen)}
          >
            <p>
              Size
              {isSizeToolsOpen ? (
                <AiFillCaretUp size={12} />
              ) : (
                <AiFillCaretDown size={12} />
              )}
            </p>
            {isSizeToolsOpen && (
              <div className='drop-down-tool'>
                <ul>
                  {sizeOption.map((type) => (
                    <li key={type} onClick={() => alert(type)}>
                      <small>{type}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* /// */}

      <div className='search-results-container'>
        {!results ? (
          <div className='loader-search'>
            <div className='spinner-border'></div>
          </div>
        ) : (
          <div className='results'>
            <div className='all-results'>
              {results.collections.map((collection) => (
                <CollectionResultCard
                  collection={collection}
                  key={collection.address}
                />
              ))}
              {results.assets.map((asset) => (
                <AssetResultCard asset={asset} key={asset.address} />
              ))}
            </div>
            <div className='match-found'>
              <ExactMatchCard result={results.exactMatch} className='match' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
