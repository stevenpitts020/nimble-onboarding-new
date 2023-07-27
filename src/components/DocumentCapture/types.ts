import React from "react";

export interface IDocumentCapture {
  onResults: (results: object) => void;
  onLoadFail: (error: any) => void;
  onNoCameraError: (error: string) => void;
  className?: string;
  style?: React.CSSProperties;
  visible: boolean;
  documentType: string;
}
export interface IVideoGuides {
  message: string;
  state: string;
}
export interface IVideoOverlay {
  state: string;
}
export interface IDocumentCaptureView {
  cameraFeed: React.RefObject<HTMLVideoElement>;
  cameraFeedback: React.RefObject<HTMLCanvasElement>;
  scanStatus: string;
  screenGrab: React.RefObject<HTMLCanvasElement>;
  videoMessage: string;
}
