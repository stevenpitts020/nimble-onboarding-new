import React, { useState } from "react";
import ReactSlider from "react-slider";
import FormatHelper from "../../../utils/FormatHelper";
import { ReactComponent as ThumbIcon } from "./img/thumb.svg";
import "./TermLoanItem.sass";
import { ITermLoanItemProps } from "./types";

const TermLoanItem = ({
  name,
  valuesRange,
  addText = "",
}: ITermLoanItemProps) => {
  const [sliderValue, setSliderValue] = useState(valuesRange[0]);
  const { format } = FormatHelper.currencyUSAFormat;

  const formatingValue = (value: number): string => {
    return format(value);
  };

  return (
    <>
      <div className={`w-full flex justify-between`}>
        <div>
          <span className="text-base text-darkest font-bold font-inter">
            {name}
          </span>
          <span className="text-base font-medium font-inter text-neutral60">
            {" "}
            {addText}
          </span>
        </div>
        <span className="text-base text-darkest font-bold font-inter">
          {formatingValue(sliderValue)}
        </span>
      </div>
      <div className="ni-slider mt-10 term-loan-slider">
        <ReactSlider
          max={valuesRange[valuesRange.length - 1]}
          min={valuesRange[0]}
          step={1000}
          thumbClassName="ni-slider-thumb"
          trackClassName={"ni-slider-track"}
          onChange={(value) => setSliderValue(value)}
          value={sliderValue}
          withTracks={true}
          renderThumb={(props, state) => (
            <div {...props}>
              <div className="relative bottom-5 ni-slider-thumb-container w-auto">
                <span className="absolute w-auto px-3 rounded-md text-white">{`${formatingValue(
                  state.valueNow
                )}`}</span>
                <div className="tooltip-arrow" />
                <ThumbIcon className="absolute top-11 ni-slider-thumb-img" />
              </div>
            </div>
          )}
        />
      </div>

      <div className="w-full flex justify-between">
        {valuesRange.map((range) => (
          <span key={range} className="text-sm font-inter text-neutral60">
            {format(range)}
          </span>
        ))}
      </div>
    </>
  );
};

export default TermLoanItem;
