import React from "react";
import Webcam from "react-webcam";

export interface IPreview {
  children?: React.ReactNode;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface IPhotoCapture {
  onTakePhoto: (photoDataUri: string) => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  width?: number;
  height?: number;
  facingMode?: string;
  onError?: (error: string) => void;
  onFlipCamera?: () => void;
  allowFlip?: boolean;
}

export interface IWhiteFlash {
  show: boolean;
}
export interface IPhotoCaptureView {
  capture: () => void;
  props: IPhotoCapture;
  height: number;
  width: number;
  allowFlip: boolean | undefined;
  onFlipCamera: (() => void) | undefined;
  webcamRef: React.RefObject<Webcam>;
  handleNoCameraError(error: string): void;
}
