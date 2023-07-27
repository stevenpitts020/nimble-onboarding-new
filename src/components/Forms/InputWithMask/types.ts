import { InputHTMLAttributes } from "react";

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  errors?: any;
  format: string;
  mask?: string;
  allowNegative?: boolean;
  type?: "text" | "tel" | "password";
  control: any; // this is from react hook, don't know the type
  rules?: any; // this is from react hook, don't know the type
}
