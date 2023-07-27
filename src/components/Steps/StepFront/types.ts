import React from "react";

export interface IStepFrontDocument {
  className?: string;
  style?: React.CSSProperties;
}
export interface IStepFrontDocumentView {
  photo: string;
  cameraState: string;
  animationOptions: any;
  error: string | undefined;
  photoCaptureMsg: string;
  status: string;
  handleTakePhoto(photoDataUri: string): void;
  handleRestartPhoto(): void;
  handleContinue(): Promise<void>;
}
