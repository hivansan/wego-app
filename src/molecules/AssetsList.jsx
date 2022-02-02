import { useEffect, useState } from 'react';

import { Api } from '../services/api';

const AssetsList = ({address}) => {
  const [resultAssets, setResultAssets] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [totalAssets, setTotalAssets] = useState(null);
  const [assetsPerPage, setAssetsPerPage] = useState(20);
  const [assetsPage, setAssetsPage] = useState(0);
  const [priceUsdRange, setPriceUsdRange] = useState(false);
  const [rankRange, setRankRange] = useState(false);
  const [assetsSort, setAssetsSort] = useState({
    orderBy: 'rarityScore',
    orderDirection: 'asc',
  });

  const api = new Api();

  const getOwnedAssets = async (
    ownerAddress,
    sortBy,
    sortDirection,
    priceRange,
    rankRange
  ) => {
    setResultAssets([]);
    setHasNextPage(true);
    const res = await api.assets.find({
      limit: assetsPerPage,
      offset: 0,
      sortBy,
      sortDirection,
      priceRange,
      rankRange,
      ownerAddress
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

  };

  const loadNextAssetsPage = async (
    ownerAddress,
    sortBy,
    sortDirection,
    priceRange,
    rankRange
  ) => {
    const isAssetsNew = assetsPage === 0 ? 20 : assetsPage + 20;
    const res = await api.assets.find({
      limit: assetsPerPage,
      offset: isAssetsNew,
      sortBy,
      sortDirection,
      priceRange,
      rankRange,
      ownerAddress
    });

    setAssetsPage(assetsPage + 20);
    setResultAssets([...resultAssets, ...res.results]);
    if (res.results.length === 0 || res.results.length < 20) {
      setHasNextPage(false);
    }

    setIsNextPageLoading(() => true);
    setIsNextPageLoading(false);
  };


  useEffect(() => {

    const PriceUsdFilter = priceUsdRange ? priceUsdRange : null;
    const rankFilter = rankRange ? rankRange : null;
    //getAssetCounter();
    setAssetsPage(0);
    getOwnedAssets(
        address,
        assetsSort.orderBy,
        assetsSort.orderDirection,
        PriceUsdFilter,
        rankFilter
    );
    window.scrollTo(0, 0);

  }, [assetsSort, rankRange, priceUsdRange]);

  return (
    <div className="assets-list">
      
    </div>);
};

export default AssetsList;
