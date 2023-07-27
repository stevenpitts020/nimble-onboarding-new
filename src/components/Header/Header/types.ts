import React from "react";

export interface IHeader {
  className?: string;
  style?: React.CSSProperties;
}

export interface IHeaderView {
  props: IHeader;
  showTimer?: boolean;
  hideLogo?: boolean;
  twoDigits(value: number): string;
}
