import React from "react";

export interface IStepSelfie {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepSelfieView {
  error: string | undefined;
  animationOptions: any;
  photo: string;
  allowFlip: boolean;
  cameraState: string;
  facingMode: string;
  status: string;
  handleTakePhoto(photoDataUri: string): void;
  handleRestartPhoto(): void;
  handleContinueSelfie(): Promise<void>;
  handleFlipCamera(): void;
  handleOpenCamera(): void;
}
