import React from "react";

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  label?: string;
  forwardRef: any; // TODO: dont know what is this type
  placeholder?: string;
  defaultValue?: number;
  className?: string;
  value?: number;
  errors?: any;
  prefix?: string;
  allowNegative?: boolean;
  isAllowed?: any;
  isNumericString?: boolean;
  onValueChange?: any;
  min?: number;
  thousandSeparator?: boolean;
}
