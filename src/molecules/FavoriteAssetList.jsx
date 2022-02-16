import { useEffect, useState } from 'react';
import FavoriteListDetails from './FavoriteListDetails';
import { Api } from '../services/api';
import { useLocation } from 'react-router-dom';
const FavoriteAssetList = ({account}) => {
  const [resultAssets, setResultAssets] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [totalAssets, setTotalAssets] = useState(null);
  const [assetsPerPage, setAssetsPerPage] = useState(20);
  const [assetsPage, setAssetsPage] = useState(0);
  const [whichAssetFavoriteIsLoading, setWhichAssetFavoriteIsLoading] = useState([]);

  
  const location = useLocation();

  const api = new Api();

  const fetchAssets = async () => {
    setResultAssets([]);
    setHasNextPage(true);
    
    const results = await api.favorites.find(account, {
      index: 'assets',
      limit: assetsPerPage,
      offset: 0
    });
    

    setResultAssets(results);

    setTotalAssets(results);
    if (results && results.length < 20) {
      setHasNextPage(false);
    }

    setIsNextPageLoading(() => true);
    setIsNextPageLoading(false);

  };

  const assetsToggleFavorite = async (isSetted, slug, contractAddress, tokenId) => {

    setWhichAssetFavoriteIsLoading(whichAssetFavoriteIsLoading.concat(tokenId));
    await api.favorites.toggleAsset(account, slug, contractAddress, tokenId, isSetted);

    setResultAssets(resultAssets.filter(en => en.slug !== slug || en.contractAddress !== contractAddress || en.tokenId !== tokenId));

    setWhichAssetFavoriteIsLoading(whichAssetFavoriteIsLoading.filter(val => val !== tokenId));

  }

  const loadNextAssetsPage = async () => {
    // No pagination on API endpoint yet

    const isAssetsNew = assetsPage === 0 ? 20 : assetsPage + 20;
    const res = await api.favorites.find(account, {
      index: 'assets',
      limit: assetsPerPage,
      offset: isAssetsNew
    });
    
    setAssetsPage(assetsPage + 20);
    setResultAssets([...resultAssets, ...res]);
    if (res.length === 0 || res.length < 20) {
      setHasNextPage(false);
    }

    setIsNextPageLoading(() => true);
    setIsNextPageLoading(false);

  };


  useEffect(() => {

    //getAssetCounter();
    setAssetsPage(0);
    fetchAssets();
    window.scrollTo(0, 0);

  }, [account]);

  return (
    <div className="assets-list">
      <FavoriteListDetails
        totalAssets={totalAssets}
        location={location}
        assets={resultAssets}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        setAssets={setResultAssets}
        _loadNextPage={loadNextAssetsPage}
        favoriteAssets={resultAssets}
        setFavoriteAssets={assetsToggleFavorite}
        favoriteAssetsLoading={whichAssetFavoriteIsLoading}
      />
    </div>);
};

export default FavoriteAssetList;
