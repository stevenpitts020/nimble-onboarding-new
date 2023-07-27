import React from "react";
import { IClueProps } from "./types";
import clsx from "clsx";

const CLUE_TYPE_CLASSES = {
  info: "text-white bg-main-accent",
  error: "text-white bg-error",
};

const CLUE_TYPE_CLASSES_HOVER = {
  info: "hover:bg-main-accent hover:text-white",
};

const Clue: React.FC<IClueProps> = ({
  text,
  renderIcon,
  type = "info",
  isLast,
  onSelect,
}) => (
  <button
    type="button"
    disabled={!onSelect}
    className={clsx(
      "px-4 py-3 w-full flex items-center text-12 mb-0.5 font-inter",
      CLUE_TYPE_CLASSES[type],
      { [CLUE_TYPE_CLASSES_HOVER[type]]: !!onSelect },
      { "rounded-b-xl": isLast }
    )}
    onClick={onSelect}
  >
    <div>{renderIcon()}</div>
    <p className="ml-3 text-left">
      {typeof text === "function" ? text() : text}
    </p>
  </button>
);

export default Clue;
