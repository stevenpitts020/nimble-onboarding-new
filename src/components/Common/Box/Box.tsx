import React from "react";
import "./Box.sass";
import { IBox } from "./types";

const Box: React.FC<IBox> = (props) => (
  <div data-testid="box" className="ni-box" style={props.style}>
    {props.children}
  </div>
);
export default Box;
