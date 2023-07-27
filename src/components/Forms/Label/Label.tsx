import React, { FC } from "react";
import "./Label.sass";
import { IProps } from "./types";

const Label: FC<IProps> = (props) => (
  <label className="form-label" htmlFor={props.for}>
    {props.children}
  </label>
);
export default Label;
