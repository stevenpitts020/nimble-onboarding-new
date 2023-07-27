import React, { InputHTMLAttributes } from "react";
import { Control, RegisterOptions } from "react-hook-form";

export interface IInputBusinessEin {
  withDomain?: boolean;
  text: string;
  placeholder: string;
  type?: string;
}

export interface IInputBusinessEinWithController
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  label?: string;
  placeholder?: string;
  type?: "text" | "tel" | "password";
  format?: string;
  mask?: string;
  allowNegative?: boolean;
  errors?: { message?: string | undefined };
  text: string;
  defaultValue?: string;
  className?: string;
  example?: string;
  autoFocus?: boolean;
  ref: React.Ref<HTMLInputElement>;
}
export interface IHeaderBusinessEin {
  text: string;
}
