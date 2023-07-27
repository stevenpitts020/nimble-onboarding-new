import React from "react";

export interface IStepBackDocument {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepBackDocumentView {
  error: string | undefined;
  cameraState: string;
  photo: string;
  status: string;
  animationOptions: any;
  handleContinue(): Promise<void>;
  handleRestartPhoto(): void;
  handleTakePhoto(photoDataUri: string): void;
}
