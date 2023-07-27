import React from "react";
import NumberFormat from "react-number-format";
import "../Input/Input.sass";
import { IProps } from "./types";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const InputCurrency: React.FunctionComponent<IProps> = (props: IProps) => (
  <div className={`form-group ${props.className}`}>
    {props.label && (
      <label className="form-label" style={{ order: 0 }}>
        {props.label}
      </label>
    )}
    <div className="form-fields">
      <NumberFormat
        value={props.value || props.defaultValue}
        name={props.name}
        // label={props.label}
        className={props.className}
        data-testid={`input-${props.name}`}
        getInputRef={props.forwardRef}
        // errors={props.errors}
        allowNegative={false}
        onValueChange={props.onValueChange}
        isNumericString={props.isNumericString}
        prefix={props.prefix}
        isAllowed={props.isAllowed}
        thousandSeparator
      />
    </div>
    <ErrorMessage errors={props.errors} />
  </div>
);

InputCurrency.defaultProps = {
  type: "text",
  className: "",
};
export default InputCurrency;
