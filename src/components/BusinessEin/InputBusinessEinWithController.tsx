import React from "react";
import NumberFormat from "react-number-format";
import { Controller, useController } from "react-hook-form";
import Tippy from "@tippyjs/react";
import warningSVG from "./warningIcon.svg";
import { IInputBusinessEinWithController } from "./types";

const InputBusinessEinWithController = ({
  name,
  control,
  rules,
  defaultValue,
  placeholder,
  label,
  type,
  format,
  mask,
  allowNegative,
  errors,
  text,
  example,
  autoFocus,
}: IInputBusinessEinWithController) => {
  const {
    field: { ref },
  } = useController({
    name: name,
    control: control,
    rules: rules,
    defaultValue: defaultValue,
  });
  return (
    <div className="flex flex-col relative justify-end">
      <p className="font-medium">{text}</p>
      <Controller
        data-testid="input-phone"
        className="mt-2 border border-neutral30 rounded-lg pt-[10px] pb-[9px] pl-3 text-sm w-full outline-0"
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
        as={<NumberFormat ref={ref} autoFocus={autoFocus} />}
      />
      {example && (
        <div className={"text-sm text-slate-500 my-2"}>
          <span>Example: </span>
          <span>{example}</span>
        </div>
      )}

      {errors && (
        <label className="absolute right-4 bottom-12">
          {Object.keys(errors).length > 1 ? (
            <Tippy placement="right" content={errors.message}>
              <img src={warningSVG} alt={warningSVG} className="w-5 h-5" />
            </Tippy>
          ) : (
            <img src={warningSVG} alt={warningSVG} className="w-5 h-5" />
          )}
        </label>
      )}
    </div>
  );
};

export default InputBusinessEinWithController;
