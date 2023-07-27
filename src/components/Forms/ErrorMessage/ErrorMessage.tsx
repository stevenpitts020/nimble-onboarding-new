import React from "react";
import "./ErrorMessage.sass";
import { IErrorMessage } from "./types";

const ErrorMessage: React.FC<IErrorMessage> = (props: IErrorMessage) => {
  if (props.errors) {
    return (
      <span
        role="alert"
        className={
          props.className ? `${props.className} field-error` : "field-error"
        }
        data-testid="ErrorMessage"
      >
        {props.errors.message}
      </span>
    );
  }
  return null;
};
export default ErrorMessage;
