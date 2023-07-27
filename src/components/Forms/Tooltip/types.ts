import React from "react";
import { Placement } from "tippy.js";

export interface ITooltip {
  text: React.ReactElement | React.ReactNode;
  className?: string;
  type?: string;
  color?: string;
  visible?: boolean;
  placement?: Placement;
}
