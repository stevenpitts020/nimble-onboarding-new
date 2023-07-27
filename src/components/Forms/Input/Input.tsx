import React, { forwardRef } from "react";
import { useUID } from "react-uid";
import "./Input.sass";
import { IProps } from "./types";
import Label from "../Label/Label";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Input = forwardRef((props: IProps, ref: React.Ref<HTMLInputElement>) => {
  const uid = useUID();
  return (
    <div className={`form-group ${props.className}`} data-testid={uid}>
      <ErrorMessage errors={props.errors} />
      <div className="form-fields">
        <input
          className="form-input"
          type={props.type}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          onKeyDown={props.onKeyDown}
          id={uid}
          onChange={props.onChange}
          placeholder={props.placeholder}
          name={props.name}
          data-testid={`input-${props.name}`}
          ref={ref}
          defaultValue={props.defaultValue}
          pattern={props.pattern}
          disabled={props.disabled}
          max={props.max}
        />
        {props.label && <Label for={uid}>{props.label}</Label>}
      </div>
    </div>
  );
});
Input.displayName = "Input";
Input.defaultProps = {
  type: "text",
  className: "",
};
export default Input;
