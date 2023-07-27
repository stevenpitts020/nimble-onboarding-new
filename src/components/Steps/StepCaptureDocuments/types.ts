import React from "react";

export interface IStepCaptureDocuments {
  className?: string;
  style?: React.CSSProperties;
}
export interface IStepCaptureDocumentsView {
  cameraState: string;
  handleResults: (result: any) => void;
  handleLoadFail: (someError: any) => void;
  handleNoCameraError: () => void;
  handleRetryUpload: () => void;
  handleDocumentTypeChange: (documentType: string) => void;
  userSelectedDocumentType: string;
  error?: string;
}
export interface IDocumentCards {
  title: string;
  icon: string;
  id: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
