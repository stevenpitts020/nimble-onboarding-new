import React from "react";
import clsx from "clsx";
import { IInputIncome } from "../types";
import { ReactComponent as TargetImage } from "../img/target.svg";
import { Controller } from "react-hook-form";
import Slider from "../../../Forms/Slider/Slider";
import Dropdown from "../../../Forms/Dropdown/Dropdown";
import { IncomeWeeks } from "../enums";
import { SliderOrientation } from "../../../Forms/Slider/enum";

const PersonalIncomeField: React.FC<IInputIncome> = ({
  errors,
  control,
  name,
  fees,
  calculation,
  className,
  additionalInfo,
}) => (
  <div
    className={clsx(
      "ni-step-personal-income-field flex flex-wrap flex-col bg-white items-center justify-center px-[56px] py-[52px]",
      className
    )}
  >
    {!calculation && <TargetImage />}
    <div className="ni-step-personal-income-slider w-full mt-[7px]">
      <p className="ni-step-personal-income-slider-head font-bold font-inter">
        My Personal Income
      </p>
      {!calculation && (
        <Controller
          control={control}
          name="incomeWeek"
          render={({ onChange, value, name }) => (
            <Dropdown
              name={name}
              className="ni-income-select"
              errors={errors}
              options={Object.values(IncomeWeeks)}
              defaultValue={value}
              onChange={onChange}
            />
          )}
        />
      )}
      <Controller
        control={control}
        name="incomeFunds"
        render={({ onChange, value, name }) => (
          <Slider
            orientation={SliderOrientation.HORIZONTAL}
            id="income"
            name={name}
            max={250000}
            min={0}
            step={1000}
            onChange={onChange}
            value={value}
            includeValueInfo
          />
        )}
      />
    </div>
    {calculation && (
      <div className="ni-step-personal-income-slider w-full mt-[7px]">
        <p className="ni-step-personal-income-slider-head font-bold font-inter">
          Fees
        </p>
        <Slider
          disabled
          black
          orientation={SliderOrientation.HORIZONTAL}
          id="fees"
          name={name}
          max={300}
          min={0}
          step={1}
          value={fees || 0}
          additionalInfo={additionalInfo}
        />
      </div>
    )}
  </div>
);

export default PersonalIncomeField;
