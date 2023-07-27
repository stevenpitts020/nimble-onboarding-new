import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { PhoneCall } from "react-feather";
import ErrorMessage from "../../../Forms/ErrorMessage/ErrorMessage";
import Tooltip from "../../../Forms/Tooltip/Tooltip";

interface IInputPhone {
  control: Control;
  name: string;
  type?: "text" | "tel" | "password";
  className?: string;
  format?: string;
  mask?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
  example?: string;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  errors?: { [key: string]: { message?: string | undefined } };
}

const InputPhone: React.FC<IInputPhone> = ({
  control,
  name,
  type,
  className,
  format,
  mask,
  defaultValue,
  autoFocus,
  placeholder,
  example,
  rules,
  errors,
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean | undefined>(
    undefined
  );
  return (
    <div className={className}>
      <div className="flex flex-1 rounded-full p-2 pl-6 bg-white justify-between items-center border border-neutral30">
        <div className="flex flex-1 items-center">
          <div className="border-r border-black pr-2 mr-2">
            <PhoneCall size={17} />
          </div>
          <Controller
            data-testid="input-phone"
            className={`focus:outline-none py-3 w-full`}
            control={control}
            name={name}
            type={type}
            format={format}
            mask={mask}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            onValueChange={({ value }) =>
              value.length < 10 && value.length > 0
                ? setShowTooltip(true)
                : setShowTooltip(false)
            }
            rules={rules}
            placeholder={placeholder}
            as={<NumberFormat />}
          />
        </div>
        <Tooltip
          text="One of the ways we authenticate your identity is by cell phone registry, device model, and location"
          className="mr-2"
          visible={showTooltip}
        />
      </div>
      <div className={"text-sm text-slate-500"}>
        <span>Example: </span>
        <span>{example}</span>
      </div>
      <ErrorMessage errors={errors?.[name]} invisible />
    </div>
  );
};

InputPhone.defaultProps = {
  className: "",
  type: "tel",
  defaultValue: "",
  errors: {},
  mask: "_",
  format: "(###) ###-####",
  placeholder: "(000) 000-0000",
  example: "(123) 456-7890",
  autoFocus: false,
};

export default InputPhone;
