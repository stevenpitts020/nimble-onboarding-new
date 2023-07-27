import React from "react";

export interface IStepSelfie {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepSelfieView {
  error: string | undefined;
  photo: string;
  allowFlip: boolean;
  cameraState: string;
  facingMode: string;
  handleTakePhoto(photoDataUri: string): void;
  handleFlipCamera(): void;
}
