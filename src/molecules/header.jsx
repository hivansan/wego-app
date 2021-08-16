import React from "react";
import { BiWalletAlt } from "react-icons/bi";

const Header = (props) => {
  return (
    <header
      style={{
        position: "sticky",
        width: "100%",
        height: "70px",
        backgroundColor: "white",
        boxShadow: "0px 0px 5px black",
        top: 0,
        zIndex: "200",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ margin: "1em", display: "flex", flexDirection: "row" }}>
        <img
          src={require("../assets/logo/blue&gray.png").default}
          alt=""
          style={{ width: "auto", height: "40px" }}
        />
        {/* <div
          style={{
            display: "grid",
            placeItems: "center",
            fontWeight: "700",
            fontSize: "4vmin",
            marginLeft: "10px",
          }}
        >
          Wego
        </div> */}
      </div>

      {/* right menu */}
      <div
        style={{
          margin: "auto 1em",
          fontWeight: "bolder",
          display: "flex",
          flexDirection: "row",
          gap: "5vw",
        }}
      >
        <a
          href="marketplace"
          style={{ textDecoration: "none", color: "black" }}
        >
          Marketplace
        </a>
        <a href="stats" style={{ textDecoration: "none", color: "black" }}>
          Stats
        </a>
        <a href="getlisted" style={{ textDecoration: "none", color: "black" }}>
          Get Listed
        </a>
        <button
          style={{
            borderWidth: "0",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          <BiWalletAlt size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
