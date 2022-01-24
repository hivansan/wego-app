import React, { useState, useEffect } from 'react';
import CollectionHeader from './CollectionHeader';
import CollectionAssets from './CollectionAssets';

import { useParams, useLocation } from 'react-router-dom';
import Error404 from '../Error404';

import { Api } from '../../services/api';
import * as Relay from '../../services/relay';
import { pathEq } from 'ramda';

const CollectionDetails = ({ setFooter, locationState }) => {
  const { slug } = useParams();
  const [result, setResult] = useState({});
  const [resultAssets, setResultAssets] = useState([]);
  const [collectionTraits, setCollectionTraits] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [filters, setFilters] = useState(null);
  const [traits, setTraits] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [priceUsdRange, setPriceUsdRange] = useState(false);
  const [rankRange, setRankRange] = useState(false);
  const [totalAssets, setTotalAssets] = useState(null);
  const [traitsCountRange, setTraitsCountRange] = useState(false);
  const [buyNow, setBuyNow] = useState(false);
  const [hasFilters, setHasFilter] = useState(false);
  const [realTotalAssets, setRealTotalAssets] = useState(null);

  const [assetsSort, setAssetsSort] = useState({
    orderBy: 'rarityScore',
    orderDirection: 'asc',
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

  const getCollectionAssets = async (
    sortBy,
    sortDirection,
    traits,
    priceRange,
    rankRange,
    traitsCountRange,
    buyNow
  ) => {
    setResultAssets([]);
    setHasNextPage(true);
    const res = await api.assets.find(
      slug,
      assetsPerPage,
      0,
      sortBy,
      sortDirection,
      traits,
      priceRange,
      rankRange,
      traitsCountRange,
      buyNow
    );
    const results =
      res && res.results && res.results.length === 0 ? null : res.results;


    setResultAssets(results);

    setTotalAssets(res);
    if (res.results && res.results.length < 20) {
      setHasNextPage(false);
    }

    setIsNextPageLoading(() => true);
    setIsNextPageLoading(false);

    setTraits(traits);
  };

  const loadNextAssetsPage = async (
    sortBy,
    sortDirection,
    traits,
    priceRange,
    rankRange,
    traitsCountRange,
    buyNow
  ) => {
    const isAssetsNew = assetsPage === 0 ? 20 : assetsPage + 20;
    const res = await api.assets.find(
      slug,
      assetsPerPage,
      isAssetsNew,
      sortBy,
      sortDirection,
      traits,
      priceRange,
      rankRange,
      traitsCountRange,
      buyNow
    );

    setAssetsPage(assetsPage + 20);
    setResultAssets([...resultAssets, ...res.results]);
    if (res.results.length === 0 || res.results.length < 20) {
      setHasNextPage(false);
    }

    setIsNextPageLoading(() => true);
    setIsNextPageLoading(false);
  };

  const getCollectionTraits = async () => {
    const res = await api.collections.traits(slug);

    setCollectionTraits(
      res?.results.sort((traitA, traitB) => {
        return (traitA.trait_type?.toLowerCase().localeCompare(traitB.trait_type?.toLowerCase()) ||
          ((traitA.value ? traitA.value : 'None').toLowerCase().localeCompare((traitB.value ? traitB.value : 'None').toLowerCase())))
      }) || []
    );
  };

  const getAssetCounter = async () => {
    const res = await api.collections.count(slug);
    setRealTotalAssets(res?.count);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCollection();
    getCollectionTraits();
    setIsMounted(true);
    locationState = [];
    return () => {
      setResultAssets([]);
      setResult({});
      setCollectionTraits(null);
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!result.status) {
      return setFooter(slug);
    }
    setFooter(true);
  }, [result]);

  useEffect(() => {
    setFilters(locationState);
  }, [location]);

  useEffect(() => {
    if (filters) {

      const traitObj = filters.reduce(function (acc, cur, i) {
        acc[cur.traitType] = acc[cur.traitType] || [];
        acc[cur.traitType].push(cur.value);
        return acc;
      }, {});

      const hasTraits = Object.keys(traitObj).length === 0 ? null : traitObj;
      const PriceUsdFilter = priceUsdRange ? priceUsdRange : null;
      const rankFilter = rankRange ? rankRange : null;
      const traitsCountFilter = traitsCountRange ? traitsCountRange : null;
      const buyNowfilter = buyNow ? buyNow : null;
      setHasFilter(hasTraits || PriceUsdFilter || rankFilter || traitsCountFilter || buyNowfilter);
      getAssetCounter();
      setAssetsPage(0);
      getCollectionAssets(
        assetsSort.orderBy,
        assetsSort.orderDirection,
        hasTraits,
        PriceUsdFilter,
        rankFilter,
        traitsCountFilter,
        buyNowfilter
      );
      window.scrollTo(0, 0);
    }
  }, [filters, assetsSort, rankRange, priceUsdRange, traitsCountRange, buyNow]);

  useEffect(() => {
    const unsubscribe = Relay.listen(
      pathEq(['collection', 'slug'], slug),
      (event) => {
        console.log('SHOW COLLECTION EVENT IN UI', event);
      }
    );

    return unsubscribe;
  }, [slug]);

  if (!isMounted) {
    return null;
  }

  if (result.status) {
    return <Error404 />;
  }

  return (
    <div className='collection-container'>
      <CollectionHeader
        collection={result}
        isFiltersMobileOpen={isFiltersMobileOpen}
      />
      <CollectionAssets
        totalAssets={totalAssets}
        setBuyNow={setBuyNow}
        buyNow={buyNow}
        traitsCountRange={traitsCountRange}
        setTraitsCountRange={setTraitsCountRange}
        setPriceRange={setPriceUsdRange}
        priceRange={priceUsdRange}
        rankRange={rankRange}
        setRankRange={setRankRange}
        collectionSlug={slug}
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
        hasFilters={hasFilters}
        realTotalAssets={realTotalAssets}
      />
    </div>
  );
};

export default CollectionDetails;
