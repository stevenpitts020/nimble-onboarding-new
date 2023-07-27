import React from "react";
import { FieldError } from "react-hook-form";

export interface IErrorMessage {
  invisible?: boolean;
  className?: string;
  style?: React.CSSProperties;
  errors?:
    | {
        message?: string;
      }
    | FieldError;
}
