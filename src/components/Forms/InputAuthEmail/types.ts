import React from "react";
import { InputProps } from "../AuthFormEmail/types";

export interface IInputAuthEmail extends InputProps {
  type?: string;
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  errors?: { message?: string | undefined };
  pattern?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  max?: string;
  autocomplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
