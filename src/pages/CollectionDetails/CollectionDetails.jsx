import React, { useState, useEffect } from 'react';
import CollectionHeader from './CollectionHeader';
import CollectionAssets from './CollectionAssets';
import { useAccount } from '../../store/selectors/useAccount';

import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useDebounce } from '../../atoms/hooks/useStateDebounce';
import Error404 from '../Error404';

import { Api } from '../../services/api';
import * as Relay from '../../services/relay';
import { pathEq } from 'ramda';
import { useStoreFilter } from '../../store/selectors/useFilters';

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
  const [searchAsset, setSearchAsset] = useState("");
  const [debounceParamAsset, setDebounceParamAsset] = useDebounce(searchAsset, 500);
  const [hasFilters, setHasFilter] = useState(false);
  const [realTotalAssets, setRealTotalAssets] = useState(null);

  const [assetsSort, setAssetsSort] = useState({
    orderBy: 'rarityScore',
    orderDirection: 'asc',
  });

  const [filtersMobileOpen, setFiltersMobileOpen] = useState(false);
  const [assetsPerPage, setAssetsPerPage] = useState(20);
  const [assetsPage, setAssetsPage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true);
  const [whichAssetFavoriteIsLoading, setWhichAssetFavoriteIsLoading] = useState([]);
  const [favoriteAssets, setFavoriteAssets] = useState([]);
  const _account = useAccount();
  const [account, setAccount] = useState(null);

  const api = new Api();
  const location = useLocation();
  const history = useHistory();
  const isFiltersMobileOpen = filtersMobileOpen ? 'd-none' : '';

  const _storeFilter = useStoreFilter();
  const { ...storeFilter } = _storeFilter;

  const getCollection = async () => {
    const collection = await api.collections.findOne(slug);
    setResult(collection);
  };

  useEffect(() => {

    if (_account && _account.account?.address != "") {
      setAccount(_account.account);
    }


  }, [_account]);


  const collectionsToggleFavorite = async isSetted => {

    if (!account || account.address === '') {
      history.push('/login');
    }
    else {
      setIsFavoriteLoading(true);
      const result = await api.favorites.toggleCollection(account, slug, isSetted);
      setIsFavorite(isSetted);
      setIsFavoriteLoading(false);
    }
  }

  const assetsToggleFavorite = async (isSetted, slug, contractAddress, tokenId) => {
    if (!account || account.address === '') {
      history.push('/login');
    }
    else {
      setWhichAssetFavoriteIsLoading(whichAssetFavoriteIsLoading.concat(tokenId));
      await api.favorites.toggleAsset(account, slug, contractAddress, tokenId, isSetted);

      if (!isSetted) {
        setFavoriteAssets(favoriteAssets.filter(ass => ass.tokenId !== tokenId && ass.slug === slug));
      }
      else {
        setFavoriteAssets(favoriteAssets.concat({ tokenId, slug, contractAddress }));
      }

      setWhichAssetFavoriteIsLoading(whichAssetFavoriteIsLoading.filter(val => val !== tokenId));
    }
  }

  const getCollectionFavoriteState = async () => {
    if (!account || account.address === '') return;
    setIsFavoriteLoading(true);

    const result = await api.favorites.find(account, { index: 'collections', slug });
    setIsFavorite(result.find(coll => coll.slug === slug));
    setIsFavoriteLoading(false);
  }

  const getAssetFavoriteState = async () => {
    if (!account || account.address === '') return;

    setWhichAssetFavoriteIsLoading(whichAssetFavoriteIsLoading.concat(-1));
    const result = await api.favorites.find(account, { index: 'assets', slug });

    setFavoriteAssets(
      result.map(ass => ({ slug, contractAddress: ass.contractAddress, tokenId: ass.tokenId }))
        .filter(ass => ass.slug === slug)
    );

    setWhichAssetFavoriteIsLoading(whichAssetFavoriteIsLoading.filter(val => val !== -1));
  }

  useEffect(() => {

    getCollectionFavoriteState();
    getAssetFavoriteState();

  }, [account]);

  useEffect(() => {
    const getCollectionAssets = async (sortBy, sortDirection, traits, priceRange, rankRange, traitsCountRange, buyNow, searchAsset) => {
      setResultAssets([]);
      setHasNextPage(true);
      const res = await api.assets.find({
        slug,
        limit: assetsPerPage,
        offset: 0,
        sortBy,
        sortDirection,
        traits,
        priceRange,
        rankRange,
        traitsCountRange,
        buyNow,
        searchAsset
      });
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
    }

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
      const searchAssetFilter = searchAsset ? searchAsset : null;
      setHasFilter(hasTraits || PriceUsdFilter || rankFilter || traitsCountFilter || buyNowfilter || searchAssetFilter);
      getAssetCounter();
      setAssetsPage(0);
      getCollectionAssets(
        assetsSort.orderBy,
        assetsSort.orderDirection,
        hasTraits,
        PriceUsdFilter,
        rankFilter,
        traitsCountFilter,
        buyNowfilter,
        searchAssetFilter
      );
      window.scrollTo(0, 0);
    }

    if (searchAsset === '') {
      setResultAssets(null);
    }
    //cleanup when component unmount
    return () => {
      setResultAssets(null);
    };
  }, [debounceParamAsset, filters, assetsSort, rankRange, priceUsdRange, traitsCountRange, buyNow]);

  const loadNextAssetsPage = async (
    sortBy,
    sortDirection,
    traits,
    priceRange,
    rankRange,
    traitsCountRange,
    buyNow,
    searchAsset
  ) => {
    const isAssetsNew = assetsPage === 0 ? 20 : assetsPage + 20;
    const res = await api.assets.find({
      slug,
      limit: assetsPerPage,
      offset: isAssetsNew,
      sortBy,
      sortDirection,
      traits,
      priceRange,
      rankRange,
      traitsCountRange,
      buyNow,
      searchAsset
    });

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
      res?.results
        .filter((trait) => trait.trait_type !== 'traitCount')
        .sort((traitA, traitB) => {
          return (traitA.trait_type?.toString().toLowerCase().localeCompare(traitB.trait_type?.toString().toLowerCase()) ||
            ((traitA.value ? traitA.value : 'None').toString().toLowerCase().localeCompare((traitB.value ? traitB.value : 'None').toString().toLowerCase())))
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

    if (account) {
      getAssetFavoriteState();
    }
  }, [location]);

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
        isFavorite={isFavorite}
        setIsFavorite={collectionsToggleFavorite}
        isFavoriteLoading={isFavoriteLoading}
        collection={result}
        isFiltersMobileOpen={isFiltersMobileOpen}
      />
      <CollectionAssets
        totalAssets={totalAssets}
        favoriteAssets={favoriteAssets}
        setFavoriteAssets={assetsToggleFavorite}
        favoriteAssetsLoading={whichAssetFavoriteIsLoading}
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
        filters={storeFilter.storeFilter}
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
        searchAsset={searchAsset}
        setSearchAsset={setSearchAsset}
        setDebounceParam={setDebounceParamAsset}
        hasFilters={hasFilters}
        realTotalAssets={realTotalAssets}
      />
    </div>
  );
};

export default CollectionDetails;
