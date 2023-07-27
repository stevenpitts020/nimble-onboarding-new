import React from "react";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface IProps extends InputProps {
  type?: string;
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  errors?: any;
  pattern?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  max?: string;
  autocomplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
