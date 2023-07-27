import React from "react";

export interface IFButtonList {
  className?: string;
  style?: React.CSSProperties;
  handleRestart: () => void;
  institution?: string;
}
