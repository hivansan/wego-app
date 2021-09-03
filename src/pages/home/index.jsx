import React, { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { OpenSeaPort, Network, OpenSeaAPI } from 'opensea-js';
import * as Web3 from 'web3';

import { infuraProvider } from '../../config/example.config';
import { useState } from 'react';
import FlagShipSection from './Flagship-section';
import TopCollectionSection from './TopCollectionSection';
import TrendingCollectionSection from './TrendingCollectionSection';
import AllCollectionsTableSection from './AllCollectionsTableSection';

const addresses = [
  ['0x8b459723c519c66ebf95b4f643ba4aa0f9b0e925', 10014],
  ['0xe19b9d6538c1ab71434098d9806a7cec5b186ba0', '87'],
  ['0x18c7766a10df15df8c971f6e8c1d2bba7c7a410b', '2402'],
  ['0x91673149ffae3274b32997288395d07a8213e41f', '641'],
  ['0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270', '131000901'],
  ['0xbace7e22f06554339911a03b8e0ae28203da9598', '650'],
  ['0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270', '118000128'],
];

const Home = (props) => {
  const [nfts, setNfts] = useState([]);

  const provider = new Web3.providers.HttpProvider(infuraProvider);

  useEffect(() => {
    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Main,
    });

    //   const api = new OpenSeaAPI({ apiKey: null });
    //   addresses.forEach((e) =>
    //   api.getAsset({ tokenAddress: e[0], tokenId: e[1] }).then((token) =>
    //     setNfts((nfts) => {
    //       nfts.push(token);
    //       return nfts;
    //     })
    //   )
    // );

    seaport.api
      .getAssets({
        asset_contract_addresses: addresses.map((address) => address[0]),
        token_ids: addresses.map((address) => address[1]),
      })
      .then((res) => setNfts(res.assets))
      .catch((err) => {});
  }, []);

  useEffect(() => console.log(nfts), [nfts]);

  return (
    <>
      <FlagShipSection />

      <section className='dividing-section'>
        <div className='divider'>
          <h1>Get featured on the homepage</h1>
        </div>
      </section>

      <TopCollectionSection />

      <section className='dividing-section'>
        <div className='divider'>
          <h1>Get listed</h1>
        </div>
      </section>

      <TrendingCollectionSection />

      <AllCollectionsTableSection />
    </>
  );
};

export default Home;
