import React from "react";
import VideoOverlay from "./VideoOverlay";
import VideoGuides from "./VideoGuides";
import { IDocumentCaptureView } from "./types";
import { ReactComponent as Loading } from "./loading.svg";

const DocumentCaptureView = ({
  cameraFeed,
  cameraFeedback,
  scanStatus,
  videoMessage,
  screenGrab,
}: IDocumentCaptureView) => (
  <div className="document-capture" data-testid="document-capture">
    <div id="overlay" className="overlay-document">
      <div className="overlay-document__scan">
        <div className="overlay-document__scan-shadow" />
      </div>
    </div>
    <video ref={cameraFeed} data-testid="camera-feed" playsInline />
    <canvas
      ref={cameraFeedback}
      width={window.innerWidth}
      height={window.innerHeight}
      data-testid="camera-feedback"
    />
    <VideoOverlay state={scanStatus} />
    <VideoGuides message={videoMessage} state={scanStatus} />

    <div className="fixed w-screen z-10 bottom-36">
      <div className="button rounded-full">
        <Loading className="animate-spin" /> Fetching data...
      </div>
    </div>

    <div className="screen-grab">
      <canvas ref={screenGrab} />
    </div>
  </div>
);

export default DocumentCaptureView;
