import React, { useState, useEffect } from 'react';
import CollectionHeader from './CollectionHeader';
import CollectionAssets from './CollectionAssets';

import { useParams, useLocation } from 'react-router-dom';

import { Api } from '../../services/api';

const CollectionDetails = ({ setFooter }) => {
  const { slug } = useParams();
  const [result, setResult] = useState({});
  const [resultAssets, setResultAssets] = useState([]);
  const [assetsFilterQuery, setAssetsQueryFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const [noMoreAssets, setNoMoreAssets] = useState(true);

  const api = new Api();
  const location = useLocation();

  const getCollection = async () => {
    setResult({});
    try {
      const collection = await api.collections.findOne(slug);
      console.log(collection);
      setResult(collection);
    } catch (err) {
      throw err;
    }
  };

  const getCollectionAssets = async () => {
    try {
      const res = await api.collections.assets(slug, assetsFilterQuery);
      setResultAssets([...resultAssets, ...res]);
      setAssetsQueryFilter({
        offset: assetsFilterQuery.offset + 20,
        limit: 20,
      });
      if (res.length === 0 || res.length < 20) {
        setNoMoreAssets(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCollection();
    getCollectionAssets();
    setFooter(slug);
  }, []);
  return (
    <div className='collection-container'>
      <CollectionHeader collection={result} />
      <CollectionAssets
        collection={result}
        location={location}
        assets={resultAssets}
        fetchMoreAssets={getCollectionAssets}
        noMoreAssets={noMoreAssets}
      />
    </div>
  );
};

export default CollectionDetails;
