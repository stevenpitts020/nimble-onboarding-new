import React from "react";
import Webcam from "react-webcam";
import CaptureButton from "./CaptureButton";
import camFlipIcon from "./camFlipIcon.svg";
import { IPhotoCaptureView } from "./type";

const PhotoCaptureView = ({
  props,
  width,
  height,
  webcamRef,
  capture,
  allowFlip,
  onFlipCamera,
}: //handleNoCameraError,
IPhotoCaptureView) => (
  <div
    data-testid="photoCapture"
    className={`ni-photo-capture facing-${props.facingMode} ${props.className}`}
    style={props.style}
  >
    {props.facingMode === "environment" ? (
      <div
        id="overlay"
        style={{
          width: "100%",
          height: "100%",
          zIndex: 10,
          borderStyle: "solid",
          borderWidth: "150px 300px",
          borderColor: "rgba(0, 0, 0, 0.31)",
          position: "absolute",
        }}
      />
    ) : width > 1448 && height > 740 ? (
      <div
        style={{
          marginLeft: "38%",
          marginTop: "5%",
          width: "25%",
          minWidth: "350px",
          height: "75%",
          zIndex: 100,
          borderStyle: "dotted",
          borderWidth: "5px",
          borderColor: "red",
          borderRadius: "380px",
          position: "absolute",
        }}
      />
    ) : null}
    <div className="ni-photo-capture-content">
      {props.title && <small className="caption">{props.title}</small>}
      <div className="video-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          imageSmoothing={false}
          videoConstraints={{
            width: props.width,
            height: props.height,
            facingMode: props.facingMode,
          }}
          //onUserMediaError={props.onError || handleNoCameraError}
        />
      </div>
      <CaptureButton onClick={capture} />
      {allowFlip && (
        <button
          className="flip-button button is-icon is-pill"
          onClick={onFlipCamera}
          data-testid="flipButton"
        >
          <img src={camFlipIcon} alt="flip camera icon" />
        </button>
      )}
    </div>
  </div>
);

export default PhotoCaptureView;
