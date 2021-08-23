import React from "react";
import { FaEthereum } from "react-icons/fa";
import { GREY, LIGHT_GREY } from "../elements/colors";
import hdate from "human-date";

const ShowcaseCard = ({
  src = "https://via.placeholder.com/360x400.png/f1f1f1/808080?showcase card",
  collection = "Collection",
  name = "NFT Name",
  from = 0.1,
  total = 30,
  left = 30,
  lastDate = new Date(new Date().getTime() + 2 ** 30),
  collectionId = "0x8b459723c519c66ebf95b4f643ba4aa0f9b0e925",
  id = "10014",
}) => {
  return (
    <div
      style={{
        margin: "10px",
        border: LIGHT_GREY,
        borderWidth: "0.06rem",
        borderStyle: "solid",
        borderRadius: "0.25rem",
        height: "calc(350px + 10vh)",
        width: "calc(250px + 5vw)",
        maxWidth: "300px",
        maxHeight: "420px",
        padding: "10px",
      }}
    >
      <a href={`/item/${collectionId}/${id}`}>
        <div
          style={{
            backgroundImage: `url("${src}"`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "70%",
          }}
        />
      </a>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div>
          <div style={{ color: GREY, fontSize: 10 }}>{collection}</div>
          <div style={{ fontWeight: "500", fontSize: 20 }}>{name}</div>
          <div style={{ color: GREY, fontSize: 10 }}>
            <span>{`${left}/${total} `}</span>
            left
          </div>
        </div>
        <div>
          <div>
            From <FaEthereum />
            <span>{from}</span>
          </div>
          <div style={{ fontSize: 12, color: GREY }}>
            {hdate.relativeTime(lastDate, { futureSuffix: "left" })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
