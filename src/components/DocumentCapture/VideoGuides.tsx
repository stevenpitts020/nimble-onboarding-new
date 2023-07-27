import React from "react";
import "./VideoGuides.sass";

interface IVideoGuides {
  message: string;
  state: string;
}

const VideoGuides: React.FC<IVideoGuides> = ({ state, message }) => (
  <div className="camera-guides">
    {state !== "done" && (
      <p className="camera-guides-message">
        {message !== "" ? message : "Loading Camera"}
      </p>
    )}
  </div>
);

export default VideoGuides;
