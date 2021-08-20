import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { OpenSeaPort, Network, OpenSeaAPI } from "opensea-js";
import * as Web3 from "web3";

import "./home.css";
import { BLUE } from "../elements/colors";
import DarkPrimaryButton from "../atoms/darkPrimaryButton";
import LightPrimaryButton from "../atoms/lightPrimaryButton";
import useWindowSize from "../atoms/hooks/useWindowSize";
import TrendingCard from "../molecules/trendingCard";
import FlagshipCard from "../molecules/flagshipCard";
import { infuraProvider } from "../config/example.config";
import { useState } from "react";

const addresses = [
  ["0x8b459723c519c66ebf95b4f643ba4aa0f9b0e925", 10014],
  ["0xe19b9d6538c1ab71434098d9806a7cec5b186ba0", "87"],
  ["0x18c7766a10df15df8c971f6e8c1d2bba7c7a410b", "2402"],
  ["0x91673149ffae3274b32997288395d07a8213e41f", "641"],
  ["0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270", "131000901"],
  ["0xbace7e22f06554339911a03b8e0ae28203da9598", "650"],
  ["0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270", "118000128"],
];

const Home = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 820px)" });
  const windowSize = useWindowSize();
  const [nfts, setNfts] = useState([]);

  const options = [
    { value: "all", label: "all categories" },
    { value: "art", label: "art" },
    { value: "music", label: "music" },
  ];

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
      {/* flagship section*/}
      <div
        style={{
          padding: "5vh 5vw",
          position: "relative",
          maxHeight: "min-height",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "5vw",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 0,
            top: 0,
            left: 0,
            backgroundImage:
              'url("https://via.placeholder.com/480x480.png/f1f1f1/808080?background image")',
            filter: "blur(5px)",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            padding: "10vh 4vw",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              fontSize: isMobile ? "32px" : "3.5vw",
            }}
          >
            Discover, collect, and sell extraordinary NFTs
          </div>
          <div
            style={{
              fontSize: isMobile ? "24px" : "1.5vw",
              paddingTop: "3vh",
              paddingBottom: "3vh",
              paddingRight: "40%",
            }}
          >
            on the world's first {"&"} largest NFT marketplace
          </div>
          <div style={{ display: "flex", gap: "2vmin" }}>
            <DarkPrimaryButton style={{ fontSize: "15px" }}>
              Explore
            </DarkPrimaryButton>
            <LightPrimaryButton style={{ fontSize: "15px" }}>
              Create
            </LightPrimaryButton>
          </div>
          <div style={{ color: BLUE, paddingTop: "8vh" }}>
            Get featured on the homepage
          </div>
        </div>
        <FlagshipCard
          style={{
            zIndex: 0,
            width: "400px",
            height: "400px",
            margin: "0 auto",
          }}
        />
      </div>
      {/* Upcoming section */}
      <div style={{ margin: "12vh 2vw" }}>
        <div
          style={{
            fontWeight: "600",
            fontSize: "calc(20px + 1vmin)",
            padding: "6vh 0",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div style={{ margin: "auto 0" }}>Upcoming in</div>
          <Select
            options={options}
            defaultValue={options[0]}
            styles={{
              control: (s) => ({ ...s, width: "400px", marginLeft: "0.3em" }),
            }}
          />
        </div>

        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          className="react__slick__slider__parent"
          responsive={[
            {
              breakpoint: 2100,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 770,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {nfts.map((nft) => (
            <div key={nft.tokenId}>
              <TrendingCard
                style={{
                  width: "30vw",
                  maxWidth: "350px",
                  minWidth: "300px",
                  margin: "0 auto",
                }}
                piece={nft.imageUrl}
                userPhoto={nft.owner.profile_img_url}
                userName={nft.owner.user.username}
                title={nft.name}
                date={nft.collection.createdDate}
                website={nft.externalLink}
                price={{
                  top: 1,
                  bottom: 0.1,
                }}
                amountNfts={0}
              />
            </div>
          ))}
        </Slider>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "40px 0",
          }}
        >
          <a
            href="/marketplace"
            style={{
              paddingTop: "0.6em",
              paddingBottom: "0.6em",
              paddingLeft: "0.8em",
              paddingRight: "0.8em",
              borderRadius: "0.25em",
              borderWidth: "0.06em",
              borderColor: BLUE,
              borderStyle: "solid",
              color: BLUE,
              fontWeight: "bolder",
              backgroundColor: "transparent",
              textDecoration: "none",
              fontSize: "calc(20px+0.5vmin)",
            }}
          >
            More
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
