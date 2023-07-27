import React from "react";

export interface IPreview {
  imageData: string;
  alt: string;
  loading: boolean;
  onRepeat(event: React.MouseEvent<HTMLButtonElement>): void;
  onContinue(event: React.MouseEvent<HTMLButtonElement>): void;
}
