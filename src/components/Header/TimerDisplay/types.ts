import React from "react";

export interface ITimerDisplay {
  className?: string;
  style?: React.CSSProperties;
  twoDigits(value: number): string;
}
