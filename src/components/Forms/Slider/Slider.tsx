import React from "react";
import clsx from "clsx";
import ReactSlider from "react-slider";
import "./Slider.sass";
import { ISlider } from "./types";
import { ReactComponent as ThumbIcon } from "./img/thumb.svg";
import { ReactComponent as ThumbIconBlack } from "./img/thumbBlack.svg";
import { formatAmount } from "../../../utils/PersistState";
import { SliderOrientation } from "./enum";

const Slider: React.FC<ISlider> = ({
  max,
  min,
  orientation,
  className,
  step,
  includeValueInfo,
  onChange,
  value,
  disabled,
  additionalInfo,
  black,
}) => (
  <div className={clsx("ni-slider mt-[42px]", className, { black: black })}>
    <ReactSlider
      disabled={disabled}
      max={max}
      min={min}
      step={step}
      thumbClassName="ni-slider-thumb"
      trackClassName="ni-slider-track"
      orientation={SliderOrientation[orientation]}
      onChange={onChange}
      value={value}
      renderThumb={(props, state) => (
        <div {...props}>
          <div className={clsx("ni-slider-thumb-container", { black: black })}>
            <span>{formatAmount(state.valueNow)}</span>
            {black ? (
              <ThumbIconBlack className="ni-slider-thumb-img" />
            ) : (
              <ThumbIcon className="ni-slider-thumb-img" />
            )}
          </div>
        </div>
      )}
    />
    {additionalInfo && <div className="ni-slider-info">{additionalInfo}</div>}
    {includeValueInfo && (
      <div className="ni-slider-info">
        <span>{formatAmount(min)}</span>
        <span>{formatAmount(max)}</span>
      </div>
    )}
  </div>
);
export default Slider;
