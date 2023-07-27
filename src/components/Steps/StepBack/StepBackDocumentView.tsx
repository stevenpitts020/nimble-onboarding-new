import React from "react";
import { Lottie } from "@alfonmga/react-lottie-light-ts";
import { AlertCircle } from "react-feather";
import PhotoCapture from "../../PhotoCamera/PhotoCapture/PhotoCapture";
import PhotoPreviewWithControls from "../../PhotoCamera/PhotoPreviewWithControls/PhotoPreviewWithControls";
import { IStepBackDocumentView } from "./types";

const StepBackDocumentView = ({
  cameraState,
  handleTakePhoto,
  animationOptions,
  handleRestartPhoto,
  photo,
  handleContinue,
  error,
  status,
}: IStepBackDocumentView) => (
  <div
    data-testid="step-back"
    className={`step-back camera-step text-center ${cameraState}`}
  >
    <PhotoCapture
      facingMode="environment"
      title="Flip your document and scan the back. Make sure you scan the barcode."
      onTakePhoto={handleTakePhoto}
    />

    <div className="intro-text">
      <h3>Please make sure that the barcode is visible and readable.</h3>
      <h2>
        Done with the back? <b>Continue to Take a Selfie</b>
      </h2>
      <div className="camera-animation">
        <Lottie config={animationOptions} />
      </div>
      <button onClick={handleRestartPhoto} className="button is-pill is-green">
        Open Camera
      </button>
    </div>

    <PhotoPreviewWithControls
      alt="Back Preview"
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

export default StepBackDocumentView;
