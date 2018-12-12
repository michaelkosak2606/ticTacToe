import React from "react";
import "./Styles.css";

const square = props => {
  return (
    <div
      className={`square ${props.styleName} ${props.pointerStyle}`}
      onClick={props.click}
    >
      {props.text}
    </div>
  );
};

export default square;
