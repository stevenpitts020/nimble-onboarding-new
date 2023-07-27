import React from "react";

export interface INoCameraMessage {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  url?: string;
  size?: number;
  children?: React.ReactNode;
}
export interface INoCameraMessageView {
  props: INoCameraMessage;
  url: string | undefined;
}
