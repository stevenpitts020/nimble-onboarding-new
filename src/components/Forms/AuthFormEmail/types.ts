import React from "react";
import { ISignerDetails } from "../../../store/reducers/type";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface IInputAuthFormEmail {
  className?: string;
  style?: React.CSSProperties;
  defaultValues?: ISignerDetails;
  signerId?: string;
  onValidate: (data: ISignerDetails) => void;
  onSubmit?: (data: ISignerDetails) => void;
}
