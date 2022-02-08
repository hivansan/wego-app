import Identicon from '../atoms/Identicon';
import CryptoIcon from '../atoms/CryptoIcon';


const ProfileHeader = ({ account }) => {

  if (!account)
    return <></>;

  return (
    <div>
      <div className={`profile-header`}>
        <div className={'identity-circle'}>
          <Identicon className={'circle'} address={account?.address} size={128}/>
        </div>
      </div>
      <div className={'profile-data'}>
        <div className={'address'}>
          <CryptoIcon token={'ETH'} />
          <div>
            {account && `${account.address.slice(0, 6)}...${account.address.slice(
                account.address.length - 4,
                account.address.length
              )}`}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
