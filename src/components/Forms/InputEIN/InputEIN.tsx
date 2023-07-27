import React from "react";
import { useUID } from "react-uid";
import "../Input/Input.sass";
import NumberFormat from "react-number-format";
import { IProps } from "./types";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const InputEIN: React.FunctionComponent<IProps> = (props) => {
  const uid = useUID();
  return (
    <div data-testid={uid}>
      <NumberFormat
        className={props.className}
        inputMode="numeric"
        format="##-#######"
        mask="_"
        placeholder={props.placeholder}
        value={props.value}
        onValueChange={({ value }) => props.onChange(value)}
        onBlur={props.onBlur}
      />
    </div>
  );
};

InputEIN.defaultProps = {
  className: "",
};
export default InputEIN;
