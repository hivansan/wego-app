import React from "react";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import "./home.css";
import { BLUE, GREY } from "../elements/colors";
import DarkPrimaryButton from "../atoms/darkPrimaryButton";
import LightPrimaryButton from "../atoms/lightPrimaryButton";
import useWindowSize from "../atoms/hooks/useWindowSize";
import TrendingCard from "../molecules/trendingCard";
import FlagshipCard from "../molecules/flagshipCard";

const Home = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 820px)" });
  const windowSize = useWindowSize();

  const options = [
    { value: "all", label: "all categories" },
    { value: "art", label: "art" },
    { value: "music", label: "music" },
  ];

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

        <CarouselProvider
          naturalSlideWidth={203}
          naturalSlideHeight={480}
          visibleSlides={Math.floor(
            windowSize.width /
              (windowSize * 0.3 < 400 ? windowSize * 0.31 : 410)
          )}
          style={{ position: "relative" }}
          infinite={true}
          totalSlides={3}
        >
          <Slider style={{ height: "500px" }}>
            <Slide index={0}>
              <TrendingCard
                title="first wego collection"
                description="we are ready for you"
                style={{
                  width: "30vw",
                  maxWidth: "400px",
                  minWidth: "300px",
                  margin: "0 auto",
                }}
                date={new Date(new Date().getTime() + 600000)}
              />
            </Slide>
            <Slide index={1}>
              <TrendingCard
                style={{
                  width: "30vw",
                  maxWidth: "400px",
                  minWidth: "300px",
                  margin: "0 auto",
                }}
                date={new Date(new Date().getTime() - 60000)}
              />
            </Slide>
            <Slide index={2}>
              <TrendingCard
                style={{
                  width: "30vw",
                  maxWidth: "400px",
                  minWidth: "300px",
                  margin: "0 auto",
                }}
              />
            </Slide>
          </Slider>
          <ButtonBack
            style={{
              position: "absolute",
              top: "50%",
              backgroundColor: "white",
              borderStyle: "solid",
              borderColor: GREY,
              borderWidth: "0.06em",
              borderRadius: "1000rem",
              height: "50px",
              width: "50px",
              zIndex: "10",
            }}
          >
            <IoIosArrowBack size={20} />
          </ButtonBack>
          <ButtonNext
            style={{
              position: "absolute",
              top: "50%",
              right: "0",
              backgroundColor: "white",
              borderStyle: "solid",
              borderColor: GREY,
              borderWidth: "0.06em",
              borderRadius: "10000rem",
              height: "50px",
              width: "50px",
              zIndex: "10",
            }}
          >
            <IoIosArrowForward size={20} />
          </ButtonNext>
        </CarouselProvider>
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
