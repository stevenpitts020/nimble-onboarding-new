import React from "react";
import { useUID } from "react-uid";
import "../Input/Input.sass";
import NumberFormat from "react-number-format";
import { Controller } from "react-hook-form";
import { IProps } from "./types";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const InputWithMask: React.FunctionComponent<IProps> = (props) => {
  const uid = useUID();
  return (
    <div className={`form-group ${props.className}`} data-testid={uid}>
      <ErrorMessage errors={props.errors} />
      <div className="form-fields">
        <Controller
          control={props.control}
          id={uid}
          data-testid={`input-${props.name}`}
          name={props.name}
          className={`form-input ${props.className}`}
          type={props.type}
          format={props.format}
          mask={props.mask}
          defaultValue={props.defaultValue}
          allowNegative={props.allowNegative}
          rules={props.rules}
          as={NumberFormat}
        />

        {props.label && (
          <label className="form-label" htmlFor={uid}>
            {props.label}
          </label>
        )}
      </div>
    </div>
  );
};

InputWithMask.defaultProps = {
  type: "text",
  className: "",
};
export default InputWithMask;
