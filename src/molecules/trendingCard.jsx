import React from "react";
import { BLUE, GREY } from "../elements/colors";

const TrendingCard = ({
  piece = "https://via.placeholder.com/720x720.png?text=Trending Collection",
  userPhoto = "https://via.placeholder.com/60x60",
  userName = "User name",
  pieceName = "Piece name",
  description = "Collection description",
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        position: "relative",
        ...props.style,
      }}
    >
      <div
        alt=""
        style={{
          zIndex: "10",
          width: "99%",
          height: "200px",
          borderStyle: "solid",
          borderWidth: "0.03rem",
          borderColor: "#d0d0d0",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
          backgroundImage: `url("${piece}")`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <img
        src={userPhoto}
        alt="profile pic"
        style={{
          position: "absolute",
          top: "178px",
          left: "0",
          right: "0",
          margin: "0 auto",
          zIndex: "20",
          border: "white",
          borderWidth: "0.125em",
          borderStyle: "solid",
          borderRadius: "3rem",
          height: "44px",
          width: "44px",
        }}
      />
      <div
        style={{
          width: "99%",
          zIndex: "15",
          borderStyle: "solid",
          borderColor: "#d0d0d0",
          borderWidth: "0.03rem",
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
        }}
      >
        <div
          style={{
            padding: "20px",
            paddingTop: "35px",
            textAlign: "center",
            color: GREY,
          }}
        >
          <div
            style={{
              fontWeight: "700",
              color: "black",
              fontSize: "calc(18px + 0.5vmin)",
            }}
          >
            {pieceName}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "calc(8px + 0.5vmin)",
              fontWeight: "700",
              margin: "0.5vh 0",
            }}
          >
            by{" "}
            <div style={{ color: BLUE, marginLeft: "0.2em" }}>{userName}</div>
          </div>
          <div style={{ margin: "4vh 0", height: "100px" }}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
