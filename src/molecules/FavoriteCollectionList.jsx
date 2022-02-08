import { useEffect, useState } from 'react';
import FavoriteListDetails from './FavoriteListDetails';
import { Api } from '../services/api';
import { useLocation } from 'react-router-dom';
const FavoriteCollectionList = ({address}) => {
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
  const [filtersMobileOpen, setFiltersMobileOpen] = useState(false);
  const location = useLocation();

  const api = new Api();

  const fetchAssets = async (
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
      ownerAddress: address
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
      ownerAddress: address
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
    fetchAssets(
        assetsSort.orderBy,
        assetsSort.orderDirection,
        PriceUsdFilter,
        rankFilter
    );
    window.scrollTo(0, 0);

  }, [assetsSort, rankRange, priceUsdRange]);

  return (
    <div className="assets-list">
      <FavoriteListDetails
        search={{ownerAddress: address}}
        totalAssets={totalAssets}
        setPriceRange={setPriceUsdRange}
        priceRange={priceUsdRange}
        rankRange={rankRange}
        setRankRange={setRankRange}
        sortBy={assetsSort.orderBy}
        sortDirection={assetsSort.orderDirection}
        assetsSort={assetsSort}
        setAssetsSort={setAssetsSort}
        filtersMobileOpen={filtersMobileOpen}
        setFiltersMobileOpen={setFiltersMobileOpen}
        location={location}
        assets={resultAssets}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        setAssets={setResultAssets}
        _loadNextPage={loadNextAssetsPage}
      />
    </div>);
};

export default FavoriteCollectionList;
