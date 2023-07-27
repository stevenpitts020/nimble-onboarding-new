import React from "react";
import { ISignerDetails } from "../../../store/reducers/type";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface IInputAuth extends InputProps {
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

export interface IInputAuthForm {
  className?: string;
  style?: React.CSSProperties;
  defaultValues?: ISignerDetails;
  signerId?: string;
  onValidate: (data: ISignerDetails) => void;
  onSubmit?: (data: ISignerDetails) => void;
  showNextButton?: boolean;
}
