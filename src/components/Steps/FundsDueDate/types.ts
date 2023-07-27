import { Control } from "react-hook-form";
export interface IFundsDateView extends IFundsDateField {
  control: Control;
  onSubmit: () => void;
  errors?: { [key: string]: { message?: string } };
  onNext?: () => void;
}

export interface IFundsDateField {
  control: Control;
  errors?: { [key: string]: { message?: string } };
}
