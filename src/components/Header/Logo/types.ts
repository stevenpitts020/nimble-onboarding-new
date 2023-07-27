import React from "react";

export interface ILogo {
  url: string;
  alt: string;
  width?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
