import { useEffect, useState } from 'react';

import { Api } from '../services/api';

const AssetsList = () => {
  const [resultAssets, setResultAssets] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [totalAssets, setTotalAssets] = useState(null);
  const [assetsPerPage, setAssetsPerPage] = useState(20);
  const [assetsPage, setAssetsPage] = useState(0);
  const api = new Api();

  const getOwnedAssets = async (
    ownerAddress,
    sortBy,
    sortDirection,
    priceRange,
    rankRange,
    buyNow
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
      buyNow,
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
    rankRange,
    buyNow
  ) => {
    const isAssetsNew = assetsPage === 0 ? 20 : assetsPage + 20;
    const res = await api.assets.find({
      limit: assetsPerPage,
      offset: isAssetsNew,
      sortBy,
      sortDirection,
      priceRange,
      rankRange,
      buyNow,
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


  return (
    <div className="assets-list">
      
    </div>);
};

export default AssetsList;
