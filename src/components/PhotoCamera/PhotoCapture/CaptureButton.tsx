import React from "react";
import { IPreview } from "./type";

/* Capture Button for camera */
const CaptureButton: React.FC<IPreview> = ({ onClick, children }) => (
  <div className="fixed w-screen z-10 bottom-32">
    <button
      className="capture-button button rounded-full"
      onClick={onClick}
      data-testid="CaptureButton"
    >
      {children}
    </button>
  </div>
);

export default CaptureButton;
