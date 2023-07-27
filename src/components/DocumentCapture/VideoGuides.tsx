import React from "react";
import "./VideoGuides.sass";
import cameraFlipFront from "./camera_feedback_flip_front.svg";
import cameraFlipBack from "./camera_feedback_flip_back.svg";
import cameraInitial from "./camera_feedback_initial.svg";
import cameraScanning from "./camera_feedback_scanning.svg";
import cameraDone from "./camera_feedback_done.svg";
import cameraError from "./camera_feedback_error.svg";

interface IVideoGuides {
  message: string;
  state: string;
}

const VideoGuides = (props: IVideoGuides) => {
  const generateClassName = () => {
    const classNames = [""];
    if (props.state !== "manual") {
      classNames.push("camera-guides-pointer");
    }
    if (props.state === "error") {
      classNames.push("error");
    }
    if (props.state === "scanning") {
      classNames.push("scanning");
    }
    return classNames.join(" ");
  };

  return (
    <div className="camera-guides">
      {props.state === "flip" ? (
        <div className="flip-card">
          <div className="flip-card-inner">
            <img className="flip-card-front" src={cameraFlipFront} alt="" />
            <img className="flip-card-back" src={cameraFlipBack} alt="" />
          </div>
        </div>
      ) : (
        <div className={generateClassName()}>
          {props.state === "" && (
            <img src={cameraInitial} className="loader_waiting" alt="" />
          )}
          {props.state === "waiting" && (
            <img src={cameraInitial} className="loader_waiting" alt="" />
          )}
          {props.state === "scanning" && (
            <img src={cameraScanning} className="loader_scanning" alt="" />
          )}
          {props.state === "done" && (
            <img src={cameraDone} className="loader_done" alt="" />
          )}
          {props.state === "error" && <img src={cameraError} alt="" />}
        </div>
      )}
      {props.state !== "done" && (
        <p className="camera-guides-message">
          {props.message !== "" ? props.message : "Loading Camera"}
        </p>
      )}
    </div>
  );
};
export default VideoGuides;
