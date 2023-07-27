import React from "react";
import { Lottie } from "@alfonmga/react-lottie-light-ts";
import { AlertCircle } from "react-feather";
import PhotoCapture from "../../PhotoCamera/PhotoCapture/PhotoCapture";
import PhotoPreviewWithControls from "../../PhotoCamera/PhotoPreviewWithControls/PhotoPreviewWithControls";
import { IStepFrontDocumentView } from "./types";

const StepFrontDocumentView = ({
  cameraState,
  photoCaptureMsg,
  handleTakePhoto,
  animationOptions,
  handleRestartPhoto,
  photo,
  handleContinue,
  error,
  status,
}: IStepFrontDocumentView) => (
  <div
    data-testid="step-front"
    className={`step-front camera-step text-center ${cameraState}`}
  >
    <PhotoCapture
      facingMode="environment"
      title={photoCaptureMsg}
      onTakePhoto={handleTakePhoto}
    />

    <div className="intro-text">
      <h3>We need to verify your identity</h3>
      <h2>
        Let’s start by scaning the <b>Front</b> of your Document
      </h2>
      <div className="camera-animation">
        <Lottie config={animationOptions} />
      </div>
      <button onClick={handleRestartPhoto} className="button is-pill is-green">
        Open Camera
      </button>
    </div>

    <PhotoPreviewWithControls
      alt="Front Preview"
      imageData={photo}
      onRepeat={handleRestartPhoto}
      onContinue={handleContinue}
      loading={status === "create"}
    />

    {error && (
      <div role="alert" className="alert toast is-error u-margin-top-xl">
        <AlertCircle /> {error}
      </div>
    )}
  </div>
);

export default StepFrontDocumentView;
