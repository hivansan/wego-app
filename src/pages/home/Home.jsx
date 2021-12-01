import { useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TopCollectionSection from './TopCollectionSection';
import NftSearchSection from './NftSearchSection';

const Home = ({ isSearchResultsOpen }) => {
  const location = useLocation();

  return (
    <>
      <NftSearchSection location={location} />
      <TopCollectionSection />
    </>
  );
};

export default Home;
