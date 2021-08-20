import { BLUE } from "../elements/colors";
import React from "react";

const DarkPrimaryButton = ({ children, style, ...props }) => {
  return (
    <button
      {...props}
      style={{
        paddingTop: "0.8em",
        paddingBottom: "0.8em",
        paddingLeft: "3em",
        paddingRight: "3em",
        borderRadius: "0.25em",
        borderWidth: "0.06em",
        borderColor: BLUE,
        borderStyle: "solid",
        color: BLUE,
        fontWeight: "bold",
        backgroundColor: "white",

        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default DarkPrimaryButton;