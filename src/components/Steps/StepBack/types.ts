import React from "react";

export interface IStepBackDocument {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepBackDocumentView {
  error: string | undefined;
  cameraState: string;
  photo: string;
  documentType: string;
  handleTakePhoto(photoDataUri: string): void;
}
