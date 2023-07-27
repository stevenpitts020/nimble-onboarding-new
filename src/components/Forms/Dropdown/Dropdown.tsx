import React from "react";
import { useUID } from "react-uid";
import "./Dropdown.sass";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Label from "../Label/Label";
import { IProps } from "./types";

const Dropdown = React.forwardRef(
  (props: IProps, ref: React.Ref<HTMLSelectElement>) => {
    const uid = useUID();
    return (
      <div
        className={`form-group form-group-select ${props.className}`}
        data-testid={uid}
      >
        <ErrorMessage errors={props.errors} />
        <div className="form-fields">
          <select
            id={uid}
            className="form-select"
            name={props.name}
            data-testid={`select-${props.name}`}
            ref={ref}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
          >
            {props.options ? (
              props.options.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))
            ) : (
              <option key="" value="">
                &apos;&apos;
              </option>
            )}
          </select>
          {props.label && <Label for={uid}>{props.label}</Label>}
        </div>
      </div>
    );
  }
);
Dropdown.displayName = "";
Dropdown.defaultProps = {
  disabled: false,
  className: "",
};
export default Dropdown;
