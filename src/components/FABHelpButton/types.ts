import React from "react";

export interface IFBAButton {
  className?: string;
  style?: React.CSSProperties;
  show?: boolean;
}
export interface IFBAButtonView {
  isAtBottom: boolean;
  show: boolean | undefined;
  newRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  toggleHelp: () => void;
}
