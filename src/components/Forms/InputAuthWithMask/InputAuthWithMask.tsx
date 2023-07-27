import React, { useEffect, useState } from "react";
import { useUID } from "react-uid";
import NumberFormat from "react-number-format";
import { Controller, useController } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import usaFlag from "../AuthFormPhone/usa-flag.svg";
import { IInputAuthWithMask } from "./types";
import clsx from "clsx";
import Tooltip from "../Tooltip/Tooltip";

const InputAuthWithMask: React.FunctionComponent<IInputAuthWithMask> = ({
  name,
  control,
  rules,
  defaultValue,
  placeholder,
  className,
  label,
  type,
  format,
  mask,
  allowNegative,
  errors,
  example,
  autoFocus,
  tooltip,
}) => {
  const uid = useUID();
  const {
    field: { ref },
  } = useController({
    name: name,
    control: control,
    rules: rules,
    defaultValue: defaultValue,
  });
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => setFocused(false);

  const handleClickOutside = () => {
    if (ref) {
      handleBlur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className={`${className}`} data-testid={uid}>
      {label && (
        <p className="text-label mb-3 text-dark font-inter font-medium">
          Cell Phone Number
        </p>
      )}
      <div className={"flex items-center flex-1"}>
        <div className="relative flex flex-col flex-1 mr-2">
          <span
            className={clsx(
              "absolute inset-y-0 left-0 flex items-center p-3 border-r font-inter",
              focused ? "border-green" : "border-gray"
            )}
          >
            <img src={usaFlag} alt="flag USA" />
            <span className="pl-2">+1</span>
          </span>
          <Controller
            data-testid="input-phone"
            className={`block font-inter text-darkest max-h-[48px] text-base bg-white border border-gray rounded-md py-3 pl-24 pr-3 shadow-sm focus:outline-none focus:border-green `}
            control={control}
            name={name}
            type={type}
            label={label}
            format={format}
            mask={mask}
            defaultValue={defaultValue}
            allowNegative={allowNegative}
            rules={rules}
            placeholder={placeholder}
            as={
              <NumberFormat
                ref={ref}
                onFocus={handleFocus}
                autoFocus={autoFocus}
              />
            }
          />
          {tooltip && (
            <label className="absolute right-4 bottom-3.5 my-auto">
              <Tooltip text={tooltip} />{" "}
            </label>
          )}
        </div>
      </div>
      {example && (
        <div className={"text-sm text-slate-500"}>
          <span>Example: </span>
          <span>{example}</span>
        </div>
      )}
      {errors && <ErrorMessage errors={errors} />}
    </div>
  );
};

InputAuthWithMask.defaultProps = {
  label: "test",
  type: "tel",
  autoComplete: "tel",
  defaultValue: "",
  className: "span-4",
  errors: { message: "" },
  mask: "_",
  format: "(###) ###-####",
  placeholder: "(000) 000-0000",
  autoFocus: false,
};
export default InputAuthWithMask;
