import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { FaSpinner } from 'react-icons/fa';

const FavoriteButton = ({ children, style, className, isFavorite, setIsFavorite, isLoading, ...props }) => {

  const hasExtraClasses = className ? className : '';

  const handleClick = e =>
  {
    e.preventDefault();
    if (isLoading)
      return false;

    
    setIsFavorite(!isFavorite);
    return false;
  }

  return (
    <button {...props} className={`${hasExtraClasses} favorite-btn`} onClick={handleClick}>
      {children}

      {isFavorite && !isLoading && (
        <div className='favorite-toggled'><Favorite /></div>
      )}
      
      {!isFavorite && !isLoading && (
        <div className='favorite-untoggled'><FavoriteBorder /></div>
      )}

      {isLoading &&
        <div className='favorite-spinner'><FaSpinner size={20} className='spinner' /></div>
      }

    </button>
  );
};

export default FavoriteButton;
