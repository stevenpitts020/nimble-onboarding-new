import React from "react";

export interface IStepFrontDocument {
  className?: string;
  style?: React.CSSProperties;
}
export interface IStepFrontDocumentView {
  photo?: string;
  cameraState: string;
  error: string | undefined;
  photoCaptureMsg: string;
  documentType: string;
  handleTakePhoto(photoDataUri: string): void;
}

export interface ITipItem {
  number: number;
  text: string;
}
