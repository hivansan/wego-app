import React from "react";
import { BLUE } from "../elements/colors";

const FlagshipCard = ({
  piece = "https://via.placeholder.com/480x480.png?text=Flagship Collection",
  userPhoto = "https://via.placeholder.com/60x60",
  userName = "User name",
  pieceName = "Piece name",
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        ...props.style,
      }}
    >
      <img src={piece} alt="" style={{ zIndex: "10" }} />
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          zIndex: "15",
          position: "absolute",
          bottom: "0",
          height: "15%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          src={userPhoto}
          alt="profile pic"
          style={{
            height: "60px",
            widht: "60px",
            borderRadius: "3rem",
            padding: "0.5em",
          }}
        />
        <div style={{ padding: "0.5em" }}>
          <div style={{ fontWeight: "600" }}>{pieceName}</div>
          <div style={{ color: BLUE, fontWeight: "500" }}> {userName}</div>
        </div>
      </div>
    </div>
  );
};

export default FlagshipCard;
