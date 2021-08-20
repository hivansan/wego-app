import React from "react";
import { FaEthereum } from "react-icons/fa";

import { BLUE, GREY } from "../elements/colors";
import LightSecondaryButton from "../atoms/ligthSecondaryButton";
import CalendarButton from "../atoms/calendarButton";

const TrendingCard = ({
  piece = "https://via.placeholder.com/720x720.png?text=Upcoming Collection",
  userPhoto = "https://via.placeholder.com/60x60",
  userName = "User name",
  title = "Piece name",
  date = new Date(),
  website = "",
  price = {
    top: 1,
    bottom: 0.1,
  },
  amountNfts = 0,
  ...props
}) => {
  const isLive = new Date() > date;
  const link = "/collection/:id"; // TODO: change this for the actual link id
  return (
    <div
      {...props}
      style={{
        position: "relative",
        ...props.style,
      }}
    >
      <a href={link} style={{ width: "100%", height: "100%" }}>
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
      </a>
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
      {!isLive && <CalendarButton title={`Live: ${title}`} date={date} />}
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
          <a
            href={link}
            style={{
              fontWeight: "700",
              color: "black",
              fontSize: "calc(18px + 0.5vmin)",
              textDecoration: "none",
            }}
          >
            {title}
          </a>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "calc(8px + 0.5vmin)",
              fontWeight: "700",
              margin: "0.5vh 0",
            }}
          >
            {userName && `by ${userName}`}
          </div>
          {website && (
            <a
              style={{ color: BLUE, textDecoration: "none", fontWeight: "700" }}
              href={website}
              rel="noreferrer"
            >
              Website
            </a>
          )}
          <div
            style={{
              paddingTop: "4vh",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              position: "relative",
            }}
          >
            <FaEthereum style={{ margin: "auto 0" }} />
            <LightSecondaryButton
              style={{ color: "#DD0000", borderColor: "#DD0000" }}
              disabled
            >
              {price.bottom}
            </LightSecondaryButton>
            <LightSecondaryButton
              style={{ color: "#008000", borderColor: "#008000" }}
              disabled
            >
              {price.top}
            </LightSecondaryButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontWeight: "600",
              marginTop: "10px",
              justifyContent: "center",
              fontSize: "calc(12px+0.5vmin)",
            }}
          >
            {amountNfts} NFTs left
          </div>
          <div style={{ margin: "3vh" }}>
            {isLive ? (
              <LightSecondaryButton
                style={{ color: "black", borderColor: "black" }}
              >
                Live
              </LightSecondaryButton>
            ) : (
              <div
                style={{
                  fontSize: "calc(12px + 0.5vmin)",
                  padding: "1vh",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
