import React from "react";
import { AlertCircle } from "react-feather";
import PhotoCapture from "../../PhotoCamera/PhotoCapture/PhotoCapture";
import PhotoPreview from "../../PhotoCamera/PhotoPreview/PhotoPreview";
import { IStepBackDocumentView } from "./types";

const StepBackDocumentView = ({
  cameraState,
  handleTakePhoto,
  photo,
  error,
  documentType,
}: IStepBackDocumentView) => (
  <div
    data-testid="step-back"
    className={`step-back camera-step text-center ${cameraState}`}
  >
    <PhotoCapture
      facingMode="environment"
      title="Flip your document and scan the back. Make sure you scan the barcode."
      onTakePhoto={handleTakePhoto}
      header={`Please take photo the BACK of your ${documentType}`}
    />

    <PhotoPreview imageData={photo} alt="Back Preview" />

    {error && (
      <div role="alert" className="alert toast is-error u-margin-top-xl">
        <AlertCircle /> {error}
      </div>
    )}
  </div>
);

export default StepBackDocumentView;
