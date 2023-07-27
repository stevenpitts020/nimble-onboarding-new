import React from "react";

export type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
export interface IProps extends SelectProps {
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
  errors?: any;
  autoFocus?: boolean;
  options?: string[];
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
