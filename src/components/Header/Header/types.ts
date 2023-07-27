import React from "react";
import { IInstitution } from "../../../NimbleRouter";

export interface IHeader {
  className?: string;
  style?: React.CSSProperties;
}
export interface IHeaderView {
  props: IHeader;
  currentStep: string;
  institution: IInstitution | undefined;
  onGoToStart: () => void;
  stepsWithTimer: string[];
  isOpen: boolean;
  onCancel?: () => void;
  onAction: () => void;
  twoDigits(value: number): string;
}
