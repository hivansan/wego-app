import React, { useState, useEffect } from 'react';
import CollectionHeader from './CollectionHeader';
import CollectionAssets from './CollectionAssets';

import { useParams, useLocation } from 'react-router-dom';
import usePrevious from '../../atoms/hooks/usePrevious';

import { Api } from '../../services/api';

const CollectionDetails = ({ setFooter }) => {
  const { address } = useParams();
  const [result, setResult] = useState({});
  const [resultA, setResultA] = useState([]);
  const [offset, setOffset] = useState(1);
  const [noMoreAssets, setNoMoreAssets] = useState(true);
  const prevAssets = usePrevious(offset);
  const api = new Api();
  const location = useLocation();

  const getCollection = async () => {
    setResult({});
    try {
      const { collection } = await api.collections.findByAddress(address);
      setResult(collection);
    } catch (err) {
      throw err;
    }
  };

  const getCollectionAssets = async () => {
    try {
      const { assets } = await api.assets.findByContract(
        '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
        offset
      );

      setResultA([...resultA, ...assets]);
      setOffset(offset + 1);
      if (assets.length === 0 || assets.length < 20) {
        setNoMoreAssets(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCollection();
    getCollectionAssets();
    setFooter(address);
  }, []);

  return (
    <div className='collection-container'>
      <CollectionHeader collection={result} />
      <CollectionAssets
        offset={offset}
        collection={result}
        location={location}
        assets={resultA}
        fetchMoreAssets={getCollectionAssets}
        noMoreAssets={noMoreAssets}
      />
    </div>
  );
};

export default CollectionDetails;
