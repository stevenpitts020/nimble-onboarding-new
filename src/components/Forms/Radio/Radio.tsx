import React from "react";
import { useUID } from "react-uid";
import "../Input/Input.sass";
import "./Radio.sass";
import { IProps } from "./types";

const Radio = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const uid = useUID();
  const testID = props["data-testid"] || `${props.name}_${props.defaultValue}`;
  return (
    <div className={`form-group ${props.className}`} data-testid={uid}>
      <div className="form-fields">
        <input
          className="form-input-radio"
          type="radio"
          id={uid}
          name={props.name}
          data-testid={testID}
          ref={ref}
          defaultChecked={props.defaultChecked}
          value={props.defaultValue}
          disabled={props.disabled}
          onChange={props.onChange}
        />
        <label
          className={`form-help ${props.disabled ? "disabled" : ""}`}
          htmlFor={uid}
        >
          {props.label}
        </label>
      </div>
    </div>
  );
});
export default Radio;
