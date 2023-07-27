import React, { forwardRef } from "react";
import { IInputAuthEmail } from "./types";
import Tippy from "@tippyjs/react";
import warningSVG from "./warningIcon.svg";

const InputAuthEmail = forwardRef(
  (
    {
      className,
      label,
      name,
      type,
      autoFocus,
      autoComplete,
      onChange,
      placeholder,
      defaultValue,
      disabled,
      pattern,
      max,
      errors,
    }: IInputAuthEmail,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className={className} data-testid={label}>
        {label && (
          <p className="text-label mb-3 font-medium text-dark">{label}</p>
        )}
        <div className="flex flex-col relative justify-end">
          <input
            className="block text-base bg-white border border-gray rounded-md p-3 shadow-sm focus:outline-none focus:border-green font-poppins text-dark"
            type={type}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            id={label}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            data-testid={`input-${name}`}
            ref={ref}
            defaultValue={defaultValue}
            pattern={pattern}
            disabled={disabled}
            max={max}
          />
          {errors && (
            <label className="absolute right-4 bottom-4 my-auto">
              {Object.keys(errors).length > 1 && (
                <Tippy placement="top" content={errors.message} visible={true}>
                  <img src={warningSVG} alt="warning" className="w-5 h-5" />
                </Tippy>
              )}
            </label>
          )}
        </div>
      </div>
    );
  }
);
InputAuthEmail.displayName = "Input";
InputAuthEmail.defaultProps = {
  defaultValue: "",
  disabled: false,
  autoFocus: false,
  max: "",
  errors: {
    message: "",
  },
  autocomplete: "email",
  onChange: () => {},
  name: "email",
  label: "Email",
  autoComplete: "email",
  placeholder: "nathanroberts@gmail.com",
  type: "email",
  className: "span-8",
};
export default InputAuthEmail;
