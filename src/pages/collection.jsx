import React, { useEffect, useState } from "react";
import millify from "millify";
import { useMediaQuery } from "react-responsive";
import { FaEthereum } from "react-icons/fa";
import axios from "axios";

import { LIGHT_GREY, GREY } from "../elements/colors";

import Showcase from "../organisms/showcase";
import getCollection from "../molecules/nftlib";

const Collection = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [data, setData] = useState({
    coverImage: "https://via.placeholder.com/480x480.png/f1f1f1/808080?Cover",
    profileImage: "https://via.placeholder.com/120x120.png?Profile",
    collectionName: "Collection Name",
    description: "This is a great project description. You should read it.",
  });

  const styles = {
    headerStats: {
      padding: "15px 25px",
      borderColor: LIGHT_GREY,
      borderStyle: "solid",
      borderLeftWidth: "0",
      borderRightWidth: "0.06rem",
      borderTopWidth: "0.06rem",
      borderBottomWidth: "0.06rem",
      textAlign: "center",
      flexWrap: "wrap",
      width: isMobile ? "40vw" : "20vw",
      height: "90px",
    },
    headerNumberStats: { fontWeight: "800", fontSize: "20px" },
    headerTextStats: { fontWeight: "500", fontSize: "14px", color: "#8a939b" },
  };

  const placeHolderNumber = (f = 100000) =>
    millify(Math.floor(Math.random() * f));

  useEffect(() => {
    axios
      .get(
        `https://api.rarible.com/protocol/v0.1/ethereum/nft/collections/${props.match.params.collectionId}`
      )
      .then((resCollection) => {
        setData((pData) => ({
          ...pData,
          collectionName: resCollection.data.name,
        }));
      });
  }, []);

  return (
    <>
      <div
        style={{
          height: "200px",
          marginBottom: "100px",
          position: "relative",
          backgroundImage: `url("${data.coverImage}")`,
          backgroundSize: "cover",
          zIndex: "0",
        }}
      >
        <div
          style={{
            zIndex: "5",
            position: "absolute",
            borderRadius: "99999rem",
            top: "140px",
            left: "0",
            right: "0",
            margin: "0 auto",
            height: "120px",
            width: "120px",
            backgroundImage: `url("${data.profileImage}")`,
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div
        style={{
          textAlign: "center",
          margin: "50px auto",
          fontSize: "10vmin",
        }}
      >
        {data.collectionName}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div
            style={{
              ...styles.headerStats,
              borderTopLeftRadius: "0.5rem",
              borderBottomLeftRadius: isMobile ? "0" : "0.5rem",
              borderLeftWidth: "0.06rem",
            }}
          >
            <div style={styles.headerNumberStats}>{placeHolderNumber()}</div>
            <div style={styles.headerTextStats}>items</div>
          </div>
          <div
            style={{
              ...styles.headerStats,
              borderLeftWidth: isMobile ? "0.06rem" : "0rem",
              borderBottomLeftRadius: isMobile ? "0.5rem" : "0rem",
            }}
          >
            <div style={styles.headerNumberStats}>{placeHolderNumber()}</div>
            <div style={styles.headerTextStats}>owner</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div
            style={{
              ...styles.headerStats,
              borderTopRightRadius: isMobile ? "0.5rem" : "0rem",
            }}
          >
            <div
              style={{
                ...styles.headerNumberStats,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaEthereum size={20} />
              {millify(Math.random())}
            </div>
            <div style={styles.headerTextStats}>floor price</div>
          </div>
          <div
            style={{
              ...styles.headerStats,
              borderTopRightRadius: isMobile ? "0" : "0.5rem",
              borderBottomRightRadius: "0.5rem",
            }}
          >
            <div
              style={{
                ...styles.headerNumberStats,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaEthereum size={20} />
              {placeHolderNumber(1000)}
            </div>
            <div style={styles.headerTextStats}>volume traded</div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", color: GREY, margin: "40px auto" }}>
        {data?.description}
      </div>
      <Showcase
        getElements={async (nextPage) => {
          if (nextPage === Infinity)
            return {
              nextPage: Infinity,
              elements: [],
            };
          try {
            const resCollection = await axios.get(
              `https://api.rarible.com/protocol/v0.1/ethereum/nft/collections/${props.match.params.collectionId}`
            );
            const res = await getCollection(
              props.match.params.collectionId,
              nextPage
            );
            console.log(res.data.items);
            const elements = res.data.items.map(
              ({ tokenId, meta, royalties, contract }) => ({
                id: tokenId,
                collectionId: contract,
                collection: "collection",
                name: meta.name,
                src: meta.image.url.BIG,
                from: Number(royalties[0]?.value) / 10_000,
                collection: resCollection.data.name,
              })
            );
            return {
              nextPage: res.data.continuation,
              elements: elements,
            };
          } catch (e) {}
        }}
      ></Showcase>
    </>
  );
};

export default Collection;
