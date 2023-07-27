import React from "react";
import { AlertCircle } from "react-feather";
import PhotoCapture from "../../PhotoCamera/PhotoCapture/PhotoCapture";
import { IStepSelfieView } from "./types";
import PhotoPreview from "../../PhotoCamera/PhotoPreview/PhotoPreview";

const StepSelfieView = ({
  cameraState,
  handleTakePhoto,
  handleFlipCamera,
  allowFlip,
  facingMode,
  photo,
  error,
}: IStepSelfieView) => (
  <div
    data-testid="step-selfie"
    className={`step-selfie camera-step text-center ${cameraState}`}
  >
    <PhotoCapture
      onTakePhoto={handleTakePhoto}
      onFlipCamera={handleFlipCamera}
      allowFlip={allowFlip}
      facingMode={facingMode}
      header="Position Face in the Oval"
    />

    <PhotoPreview imageData={photo} alt="Selfie Preview" />

    {error && (
      <div role="alert" className="alert toast is-error  u-margin-top-xl">
        <AlertCircle /> {error}
      </div>
    )}
  </div>
);

export default StepSelfieView;
