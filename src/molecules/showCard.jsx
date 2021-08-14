import React from "react";
import { BiCalendarAlt } from "react-icons/bi";
import { google } from "calendar-link";

import LightSecondaryButton from "../atoms/ligthSecondaryButton";

const ShowCard = ({
  image = "https://via.placeholder.com/480x480.png?text=Exclusive Collection",
  bgColor = "#1E6693",
  date = new Date(),
  description = "Collection description",
  title = "Collection title",
  style,
  ...props
}) => {
  const isLive = new Date() > date;
  const liveEvent = {
    title: `Live: ${title}`,
    description: description,
    start: date,
    duration: [1, "hour"],
  };
  return (
    <div
      {...props}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "400px",
        ...style,
      }}
    >
      {!isLive && (
        <a
          href={google(liveEvent)}
          rel="noreferrer"
          target="_blank"
          style={{
            position: "absolute",
            right: "0.5em",
            top: "0.5em",
            fontSize: "20px",
            borderRadius: "0.2em",
            borderWidth: "0",
            padding: "0.5em",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <BiCalendarAlt />
        </a>
      )}
      {/**calendar */}
      <img
        src={image}
        alt=""
        style={{
          width: "480",
          height: "480",
          borderTopLeftRadius: "0.25rem",
          borderTopRightRadius: "0.25rem",
        }}
      />
      <div
        style={{
          backgroundColor: bgColor,
          borderBottomLeftRadius: "0.25rem",
          borderBottomRightRadius: "0.25rem",
          color: "white",
          height: "211px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "calc(20px + 0.5vmin)",
            fontWeight: "800",
            padding: "20px 0",
          }}
        >
          {title}
        </div>
        <div style={{ height: "80px", width: "70%", margin: "0 auto" }}>
          {description}
        </div>
        {isLive ? (
          <LightSecondaryButton style={{ marginBottom: "30px" }}>
            Live
          </LightSecondaryButton>
        ) : (
          <div
            style={{
              fontSize: "calc(12px + 0.5vmin)",
              fontWeight: "600",
              marginBottom: "30px",
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
  );
};

export default ShowCard;
