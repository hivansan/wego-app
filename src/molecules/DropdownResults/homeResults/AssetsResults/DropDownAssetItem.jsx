import { Link } from 'react-router-dom';
import ImageTypeDetect from '../../../ImageTypeDetect';

const DropDownAssetItem = ({ asset, location, isOpen }) => (
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
        <small>
          Total traits:{' '}
          <strong>
            {asset?.traitsCount || asset?.traits?.length || 0}
          </strong>
        </small>
        {asset.rarityScore ? (
          <small>
            Rarity Score:{' '}
            <strong>
              {asset?.rarityScore?.toString().substring(0, 8) || 0}
            </strong>
          </small>) : null}
        {asset.avgTraitRarity ? (
          <small>
            Average Trait Rarity:{' '}
            <strong>
              {asset?.avgTraitRarity?.toString().substring(0, 8) || 0 + '%'}
            </strong>
          </small>) : null}
        {asset.statisticalRarity ? (
          <small>
            Statistical Rarity:{' '}
            <strong>
              {asset?.statisticalRarity?.toString().substring(0, 10) || 0 + '%'}
            </strong>
          </small>) : null}
        {asset.singleTraitRarity ? (

          <small>
            Single Trait Rarity:{' '}
            <strong>
              {asset?.singleTraitRarity?.toString().substring(0, 8) || 0 + '%'}
            </strong>
          </small>) : null}
      </div>
    </div>
  </Link>
);

export default DropDownAssetItem;
