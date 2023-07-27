import React from "react";
import { IPreview } from "./type";

/* Capture Button for camera */
const CaptureButton = (props: IPreview) => (
  <button
    className="capture-button button is-icon is-pill"
    onClick={props.onClick}
    data-testid="CaptureButton"
  >
    {props.children}
  </button>
);
export default CaptureButton;
