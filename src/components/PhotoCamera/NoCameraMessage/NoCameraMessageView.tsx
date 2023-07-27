import React from "react";
import { QRCode } from "react-qr-svg";
import { INoCameraMessageView } from "./types";

const NoCameraMessageView = ({ props, url }: INoCameraMessageView) => (
  <div
    data-testid="NoCameraMessage"
    className={`ni-no-camera-message ${props.className}`}
    style={props.style}
  >
    <h3>We need a camera to scan your ID</h3>
    <h2>{props.title}</h2>
    {props.children}
    <div className="columns">
      <div className="qrcode">
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ width: props.size! }}
          value={url!}
        />
      </div>
      <ol className="steps">
        <li>Open your phone or tablet camera</li>
        <li>Point the camera to the QR code below</li>
        <li>A notification will prompt asking to open a link</li>
        <li>Click yes and finish the process</li>
      </ol>
    </div>
  </div>
);

export default NoCameraMessageView;
