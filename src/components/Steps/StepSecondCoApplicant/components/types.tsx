import { Dispatch, SetStateAction } from "react";
import { InputProps } from "../../../Forms/AuthFormEmail/types";

export interface IStepSecondCoApplicantView {
  goToNextStep: () => void;
}
export interface IHeaderForm {
  title: string;
  isOpenCoApplicant: boolean;
  setIsOpenCoApplicant: Dispatch<SetStateAction<boolean>>;
}

export interface ISelect extends InputProps {
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
  options: string[];
}
