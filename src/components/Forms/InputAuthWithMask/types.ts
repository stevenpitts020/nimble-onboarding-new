import { InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { Control, RegisterOptions } from "react-hook-form";

export interface IInputAuthWithMask
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  errors?: { message?: string | undefined };
  format?: string;
  mask?: string;
  allowNegative?: boolean;
  type?: "text" | "tel" | "password";
  control: Control;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  example?: string;
  autoFocus?: boolean;
  tooltip?: ReactElement | ReactNode;
}
