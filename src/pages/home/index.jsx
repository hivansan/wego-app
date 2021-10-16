import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { OpenSeaPort, Network, OpenSeaAPI } from 'opensea-js';
import * as Web3 from 'web3';

import { infuraProvider } from '../../config/example.config';
import { useState } from 'react';
import TopCollectionSection from './TopCollectionSection';

import NftSearchSection from './NftSearchSection';

const Home = ({ isSearchResultsOpen }) => {
  const [nfts, setNfts] = useState([]);
  const location = useLocation();

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

    // seaport.api
    //   .getAssets({
    //     asset_contract_addresses: addresses.map((address) => address[0]),
    //     token_ids: addresses.map((address) => address[1]),
    //   })
    //   .then((res) => setNfts(res.assets))
    //   .catch((err) => {});
  }, []);

  return (
    <>
      <NftSearchSection location={location} />

      {/* <FlagShipSection location={location} /> */}

      {/* <section className='dividing-section'>
        <div className='divider'>
          <h1>Get featured on the homepage</h1>
        </div>
      </section> */}

      <TopCollectionSection />

      {/* <section className='dividing-section'>
        <div className='divider'>
          <h1>Get listed</h1>
        </div>
      </section> */}

      {/* <TrendingCollectionSection /> */}
    </>
  );
};

export default Home;
