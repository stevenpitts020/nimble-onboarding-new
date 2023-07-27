import React, { useEffect, useState } from "react";
import InfoIcon from "../../../assets/inf.svg";
import { ReactComponent as Triangle } from "./icon/tooltipTriangle.svg";
import checkedIcon from "../../../assets/checkedIcon.svg";
import { ITooltip } from "./types";

const Tooltip: React.FC<ITooltip> = ({ text, isValid, value }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
      if (!value) {
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      className="z-20"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div
          className="absolute w-full bg-hawkesBlue left-0 mt-2 text-black text-12 rounded py-3 px-5"
          style={{ bottom: "70px" }}
        >
          <p className="text-12" style={{ fontSize: "12px" }}>
            {text}
          </p>
          <Triangle
            className="absolute right-[14px] my-rotate-x-180 "
            style={{ bottom: "-20px" }}
          />
        </div>
      )}
      <img src={isValid ? checkedIcon : InfoIcon} alt="info" width={25} />
    </div>
  );
};

export default Tooltip;
