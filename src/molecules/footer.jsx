import React from "react";
import { FaTwitter, FaReddit, FaFacebook } from "react-icons/fa";
import { BLUE } from "../elements/colors";

const Footer = (props) => {
  return (
    <div
      style={{
        height: "100px",
        boxShadow: "0px 0px 1px black",
        color: "white",
        backgroundColor: BLUE,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "12px",
        padding: "40px",
      }}
    >
      <div style={{ fontWeight: "600", fontSize: "40px" }}>Wego</div>
      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <FaTwitter /> <FaReddit /> <FaFacebook />
      </div>
    </div>
  );
};

export default Footer;
