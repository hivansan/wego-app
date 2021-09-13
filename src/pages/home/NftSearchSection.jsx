import React, { useState, useEffect } from 'react';
import NftSearchBar from '../../molecules/NftSearchBar';

import { useDebounce } from '../../atoms/hooks/useStateDebounce';
import { Api } from '../../services/api';

const NftSearchSection = ({ location }) => {
  const [param, setParam] = useState('');
  const [debounceParam, setDebounceParam] = useDebounce(param, 500);
  const [results, setResults] = useState(null);

  const api = new Api();

  const getRequest = async () => {
    setResults(null);
    try {
      const res = await api.search(debounceParam);
      setResults(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (debounceParam !== '') {
      getRequest();
    }
    if (param === '') {
      setResults(null);
    }

    //cleanup when component unmount
    return () => {
      setResults(null);
    };
  }, [debounceParam]);

  return (
    <section className='nft-search-section'>
      <h1>
        <strong>NFT</strong> Search
      </h1>
      <NftSearchBar
        setDebounceParam={setDebounceParam}
        value={param}
        onChange={setParam}
        results={results}
        query={param}
        location={location}
      />
    </section>
  );
};

export default NftSearchSection;
