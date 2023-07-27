import React from "react";
import { Lottie } from "@alfonmga/react-lottie-light-ts";
import { AlertCircle } from "react-feather";
import PhotoCapture from "../../PhotoCamera/PhotoCapture/PhotoCapture";
import PhotoPreviewWithControls from "../../PhotoCamera/PhotoPreviewWithControls/PhotoPreviewWithControls";
import { IStepSelfieView } from "./types";

const StepSelfieView = ({
  cameraState,
  handleTakePhoto,
  handleFlipCamera,
  allowFlip,
  facingMode,
  animationOptions,
  handleOpenCamera,
  photo,
  handleRestartPhoto,
  handleContinueSelfie,
  error,
  status,
}: IStepSelfieView) => (
  <div
    data-testid="step-selfie"
    className={`step-selfie camera-step text-center ${cameraState}`}
  >
    <PhotoCapture
      onTakePhoto={handleTakePhoto}
      onFlipCamera={handleFlipCamera}
      allowFlip={allowFlip}
      title="Position your face in the middle of the screen. Make sure your face visible."
      facingMode={facingMode}
    />

    <div className="intro-text">
      <h3>Almost there.</h3>
      <h2>Now let&apos;s take a photo to confirm your identity</h2>
      <div className="camera-animation">
        <Lottie config={animationOptions} />
      </div>
      <button onClick={handleOpenCamera} className="button is-pill is-green">
        Open Camera
      </button>
    </div>

    <PhotoPreviewWithControls
      alt="Selfie Preview"
      imageData={photo}
      onRepeat={handleRestartPhoto}
      onContinue={handleContinueSelfie}
      loading={status === "create"}
    />

    {error && (
      <div role="alert" className="alert toast is-error  u-margin-top-xl">
        <AlertCircle /> {error}
      </div>
    )}
  </div>
);

export default StepSelfieView;
