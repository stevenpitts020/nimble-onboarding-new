import React from "react";

export interface IAlertMessage {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  children?: React.ReactNode;
}
