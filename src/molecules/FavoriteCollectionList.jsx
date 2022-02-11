import { useEffect, useState } from 'react';
import { Api } from '../services/api';
import FavoriteCollectionRow from './FavoriteCollectionRow';

const FavoriteCollectionList = ({account}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const api = new Api();

  const fetchAssets = async () => {
    setIsLoading(true);

    const results = await api.favorites.find(account, {index: 'collections'});
    setCollections(results);

    setIsLoading(false);
  };


  useEffect(() => {

    if (account && account.address != '')
      fetchAssets();


  }, [account]);

  return (
    <div className="collection-list">
      {isLoading && (
        <>Loading collections</>
      )}
      <div className="favorite-collection-row">
        <div className="collection-head">
          <div className='stat'>Collection</div>
        </div>
        <div className="collection-stats">
          <div className="stat">Floor Price</div>
          <div className="stat">7d Volume</div>
          <div className="stat">1d</div>
          <div className="stat">7d</div>
          <div className="stat">30d</div>
          <div className="stat">Owners</div>
          <div className="stat">Items</div>
        </div>
      </div>
      {!isLoading && (
        collections.map(coll => 
        <FavoriteCollectionRow collectionInfo={coll} key={coll.slug} />)
      )}


    </div>);
};

export default FavoriteCollectionList;
