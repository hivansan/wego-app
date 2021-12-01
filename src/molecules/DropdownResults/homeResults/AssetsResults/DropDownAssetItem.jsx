import { Link } from 'react-router-dom';
import ImageTypeDetect from '../../../ImageTypeDetect';

const DropDownAssetItem = ({ asset, location, isOpen }) =>
  <Link
    to={{
      pathname: `assets/${asset.contractAddress
        ? asset.contractAddress
        : asset.asset_contract.address
        }/${asset.tokenId ? asset.tokenId : asset.token_id}`,
      state: { background: location, searchResults: isOpen },
    }}
    key={asset.id}
  >
    <div className='asset'>
      <div className='asset-info-container'>

        <ImageTypeDetect
          imageURL={asset?.image_preview_url || asset.imageSmall}

          alt={asset.name}
          className='asset-img'
        />

        <div className='asset-info'>
          <p>{asset.name || asset?.tokenId}</p>
        </div>
      </div>
      <div className='asset-stats'>
        {asset._lastSalePrice && (
          <small>
            Last Price Sold: <strong>${asset._lastSalePrice}</strong>
          </small>
        )}

      </div>
    </div>
  </Link>



export default DropDownAssetItem;
