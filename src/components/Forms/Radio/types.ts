import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface IProps extends InputProps {
  label?: string;
  name: string;
  className?: string;
  errors?: any;
  defaultChecked?: boolean;
  defaultValue: string;
  help?: string;
  disabled?: boolean;
  "data-testid"?: string;
}
