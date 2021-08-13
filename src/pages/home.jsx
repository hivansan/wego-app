import React from "react";
import { useMediaQuery } from "react-responsive";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./home.css";
import { BLUE } from "../elements/colors";
import DarkPrimaryButton from "../atoms/darkPrimaryButton";
import LightPrimaryButton from "../atoms/lightPrimaryButton";
import FlagshipCard from "../molecules/flagshipCard";
import ShowCard from "../molecules/showCard";

const responsive = {
  lgDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 2200, min: 1620 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1620, min: 1220 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1220, min: 820 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 820, min: 0 },
    items: 1,
  },
};

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
      <div style={{ margin: "6vh" }}>
        <div
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "calc(20px + 0.5vmin)",
            padding: "6vh 0",
          }}
        >
          Exclusive Wego drops
        </div>
        <Carousel
          responsive={responsive}
          infinite={true}
          itemClass="carousel-item"
        >
          <ShowCard
            title="first wego collection"
            description="we are ready for you"
            bgColor="#8E3B37"
            style={{ width: "20vw" }}
            date={new Date(new Date().getTime() + 600000)}
          />
          <ShowCard
            style={{ width: "20vw" }}
            date={new Date(new Date().getTime() - 60000)}
          />
          <ShowCard style={{ width: "20vw" }} />
        </Carousel>
      </div>
    </>
  );
};

export default Home;
