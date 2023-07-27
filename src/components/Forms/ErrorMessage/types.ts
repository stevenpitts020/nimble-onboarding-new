import React from "react";
import { FieldError } from "react-hook-form";

export interface IErrorMessage {
  className?: string;
  style?: React.CSSProperties;
  errors?:
    | {
        message?: string;
      }
    | FieldError;
}
