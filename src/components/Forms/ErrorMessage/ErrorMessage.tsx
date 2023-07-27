import React from "react";
import "./ErrorMessage.sass";
import { IErrorMessage } from "./types";
import clsx from "clsx";

const ErrorMessage: React.FC<IErrorMessage> = ({
  errors,
  className,
  invisible,
}) => {
  if (errors) {
    return (
      <span
        role="alert"
        className={clsx(className, "field-error")}
        data-testid="ErrorMessage"
      >
        {errors.message}
      </span>
    );
  } else if (invisible) {
    return (
      <span
        className={clsx(className, "field-error invisible")}
        data-testid="ErrorMessageInvisible"
      >
        No error
      </span>
    );
  }
  return null;
};
export default ErrorMessage;
