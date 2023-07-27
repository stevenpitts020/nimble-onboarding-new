import React from "react";
import { CornerDownLeft } from "react-feather";
import { ReactComponent as Sparkle } from "./sparkle.svg";
import { ITips } from "./types";

const Tips: React.FC<ITips> = ({ show }) => (
  <div
    className={`flex pb-3 align-center justify-center ${
      show ? "visible" : "invisible"
    }`}
  >
    <Sparkle className={"mt-0.5 mr-1"} />
    <p className="text-sm font-normal">
      Tips:
      <span className="text-slate-400"> You can press </span>
      Enter
      <span className="text-slate-400"> to next steps</span>
    </p>
    <CornerDownLeft className={"ml-0.5"} size={16} />
  </div>
);

export default Tips;
