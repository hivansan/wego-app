import React from "react";
import { useMediaQuery } from "react-responsive";

import DarkPrimaryButton from "../atoms/darkPrimaryButton";
import LightPrimaryButton from "../atoms/lightPrimaryButton";
import FlagshipCard from "../molecules/flagshipCard";

const Home = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 820px)" });

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
              fontSize: isMobile ? "32px" : "3vw",
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
        </div>
        <FlagshipCard
          style={{
            zIndex: 0,
            width: "500px",
            height: "auto",
            margin: "0 auto",
          }}
        />
      </div>
    </>
  );
};

export default Home;
