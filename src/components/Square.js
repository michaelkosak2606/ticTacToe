import React from "react";
import "./Board.css";

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
