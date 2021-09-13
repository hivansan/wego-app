import React, { useState, useEffect } from 'react';
import CollectionHeader from './CollectionHeader';
import CollectionAssets from './CollectionAssets';

import { useParams, useLocation } from 'react-router-dom';

import { Api } from '../../services/api';

const CollectionDetails = () => {
  const [result, setResult] = useState({});
  const { address } = useParams();
  const api = new Api();
  const location = useLocation();

  const getCollection = async () => {
    try {
      const { collection } = await api.collections.findByAddress(address);
      setResult(collection);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className='collection-container'>
      <CollectionHeader collection={result} />
      <CollectionAssets collection={result} location={location} />
    </div>
  );
};

export default CollectionDetails;
