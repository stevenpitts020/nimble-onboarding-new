import React from "react";
import Tippy from "@tippyjs/react";
import { ReactComponent as InfoIcon } from "./info.svg";
import { AlertTriangle } from "react-feather";
import { ITooltip } from "./types";
import "tippy.js/dist/tippy.css";

export const TOOLTIP_TYPE = {
  ERROR: "ERROR",
  INFO: "INFO",
};

const TooltipIcon = {
  [TOOLTIP_TYPE.ERROR]: AlertTriangle,
  [TOOLTIP_TYPE.INFO]: InfoIcon,
};

const TooltipIconColor = {
  [TOOLTIP_TYPE.ERROR]: "red",
};

const Tooltip: React.FC<ITooltip> = ({
  className,
  text,
  type = TOOLTIP_TYPE.INFO,
  color = TooltipIconColor[type],
  visible,
  placement = "top",
}) => {
  const Icon = TooltipIcon[type];

  return (
    <Tippy placement={placement} content={text} visible={visible}>
      <Icon className={className} color={color} />
    </Tippy>
  );
};

export default Tooltip;
