import React, { useState, useEffect } from 'react';
import NftSearchBar from '../../molecules/NftSearchBar';

import { useDebounce } from '../../atoms/hooks/useStateDebounce';
import { Api } from '../../services/api';

const NftSearchSection = ({ location }) => {
  const [param, setParam] = useState('');
  const [debounceParam, setDebounceParam] = useDebounce(param, 500);
  const [searchResults, setSearchResults] = useState(null);

  const api = new Api();

  const getRequest = async () => {
    setSearchResults(null);
    try {
      const res = await api.search(debounceParam);
      console.log(res);
      setSearchResults(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (debounceParam !== '') {
      getRequest();
    }
    if (param === '') {
      setSearchResults(null);
    }

    //cleanup when component unmount
    return () => {
      setSearchResults(null);
    };
  }, [debounceParam]);

  return (
    <section className='nft-search-section'>
      <div className='search-section-logo'>
        <img
          src={require('../../assets/logo/blue&gray.png').default}
          alt=''
          className='logo'
        />
      </div>

      <NftSearchBar
        setDebounceParam={setDebounceParam}
        value={param}
        onChange={setParam}
        results={searchResults}
        query={param}
        location={location}
      />
    </section>
  );
};

export default NftSearchSection;
