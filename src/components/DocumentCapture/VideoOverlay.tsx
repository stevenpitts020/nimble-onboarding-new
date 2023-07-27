import React from "react";

interface IVideoOverlay {
  state: string;
}
const VideoOverlay = (props: IVideoOverlay) => (
  <div
    className={`video-overlay ${
      props.state === "" || props.state === "flip" || props.state === "done"
        ? "active"
        : ""
    }`}
  />
);
export default VideoOverlay;
