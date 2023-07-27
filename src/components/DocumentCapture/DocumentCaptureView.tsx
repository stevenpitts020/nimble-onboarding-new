import React from "react";
import VideoOverlay from "./VideoOverlay";
import VideoGuides from "./VideoGuides";
import { IDocumentCaptureView } from "./types";

const DocumentCaptureView = ({
  cameraFeed,
  cameraFeedback,
  scanStatus,
  videoMessage,
  screenGrab,
}: IDocumentCaptureView) => (
  <div className="document-capture" data-testid="document-capture">
    <div
      id="overlay"
      style={{
        width: "100%",
        height: "100%",
        zIndex: 100,
        borderStyle: "solid",
        borderWidth: "150px 300px",
        borderColor: "rgba(0, 0, 0, 0.31)",
        position: "absolute",
      }}
    />
    <video ref={cameraFeed} data-testid="camera-feed" playsInline />
    <canvas
      ref={cameraFeedback}
      width={window.innerWidth}
      height={window.innerHeight}
      data-testid="camera-feedback"
    />
    <VideoOverlay state={scanStatus} />
    <VideoGuides message={videoMessage} state={scanStatus} />
    <div className="screen-grab">
      <canvas ref={screenGrab} />
    </div>
  </div>
);

export default DocumentCaptureView;
