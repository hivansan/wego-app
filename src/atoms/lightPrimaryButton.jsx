import { BLUE } from "../elements/colors";
import React from "react";

const DarkPrimaryButton = ({ children, style, ...props }) => {
  return (
    <button
      {...props}
      style={{
        padding: "1em  1em",
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
