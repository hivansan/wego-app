import React, { useState, useEffect } from 'react';
import CollectionHeader from './CollectionHeader';
import CollectionAssets from './CollectionAssets';

import { useParams, useLocation } from 'react-router-dom';
import Error404 from '../Error404';

import { Api } from '../../services/api';

const CollectionDetails = ({ setFooter }) => {
  const { slug } = useParams();
  const [result, setResult] = useState({});
  const [resultAssets, setResultAssets] = useState([]);
  const [collectionTraits, setCollectionTraits] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [traits, setTraits] = useState([]);

  const [assetsSort, setAssetsSort] = useState({
    orderBy: 'none',
    orderDirection: 'desc',
  });
  const [filtersMobileOpen, setFiltersMobileOpen] = useState(false);
  const [assetsPerPage, setAssetsPerPage] = useState(20);
  const [assetsPage, setAssetsPage] = useState(0);
  const api = new Api();
  const location = useLocation();
  const isFiltersMobileOpen = filtersMobileOpen ? 'd-none' : '';

  const getCollection = async () => {
    const collection = await api.collections.findOne(slug);
    setResult(collection);
  };

  const getCollectionAssets = async (sortBy, sortDirection, traits) => {
    setResultAssets([]);
    setHasNextPage(true);
    const res = await api.collections.assets(
      slug,
      assetsPerPage,
      0,
      sortBy,
      sortDirection,
      traits
    );

    if (traits) {
      const results = res.results.length === 0 ? null : res.results;
      setResultAssets(results);

      if (res.results.length < 10) {
        setHasNextPage(false);
      }
    } else {
      setResultAssets(res);

      if (res.length < 20) {
        setHasNextPage(false);
      }
    }
    setIsNextPageLoading(() => true);
    setIsNextPageLoading(false);

    setTraits(traits);
  };

  const loadNextAssetsPage = async (sortBy, sortDirection, traits) => {
    const isAssetsNew = assetsPage === 0 ? 20 : assetsPage + 20;
    const res = await api.collections.assets(
      slug,
      assetsPerPage,
      isAssetsNew,
      sortBy,
      sortDirection,
      traits
    );

    if (traits) {
      setAssetsPage(assetsPage + 10);
      setResultAssets([...resultAssets, ...res.results]);
      if (res.results.length === 0 || res.results.length < 10) {
        setHasNextPage(false);
      }
    } else {
      setAssetsPage(assetsPage + 20);
      setResultAssets([...resultAssets, ...res]);
      if (res.length === 0 || res.length < 20) {
        setHasNextPage(false);
      }
    }

    setIsNextPageLoading(() => true);
    setIsNextPageLoading(false);
  };

  const getCollectionTraits = async () => {
    const { results } = await api.collections.traits(slug);
    setCollectionTraits(results);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCollection();
    getCollectionTraits();
    return () => {
      setResultAssets([]);
      setResult({});
      setCollectionTraits(null);
    };
  }, []);

  useEffect(() => {
    if (!result.msg) {
      return setFooter(slug);
    }
    setFooter(true);
  }, [result]);

  useEffect(() => {
    var traitObj = filters.reduce(function (acc, cur, i) {
      acc[cur.traitType] = acc[cur.traitType] || [];
      acc[cur.traitType].push(cur.value);
      return acc;
    }, {});

    const hasTraits = Object.keys(traitObj).length === 0 ? null : traitObj;
    setAssetsPage(0);

    getCollectionAssets(
      assetsSort.orderBy,
      assetsSort.orderDirection,
      hasTraits
    );
  }, [filters, assetsSort]);

  if (result.msg) {
    return <Error404 />;
  }

  return (
    <div className='collection-container'>
      <CollectionHeader
        collection={result}
        isFiltersMobileOpen={isFiltersMobileOpen}
      />
      <CollectionAssets
        traits={traits}
        sortBy={assetsSort.orderBy}
        sortDirection={assetsSort.orderDirection}
        assetsSort={assetsSort}
        setAssetsSort={setAssetsSort}
        setFiltersMobileOpen={setFiltersMobileOpen}
        setFilters={setFilters}
        filters={filters}
        collectionTraits={collectionTraits}
        setCollectionTraits={setCollectionTraits}
        collection={result}
        location={location}
        assets={resultAssets}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        setAssets={setResultAssets}
        filtersMobileOpen={filtersMobileOpen}
        _loadNextPage={loadNextAssetsPage}
      />
    </div>
  );
};

export default CollectionDetails;
