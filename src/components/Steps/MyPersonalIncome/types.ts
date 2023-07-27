import { Control } from "react-hook-form";

export interface PersonalIncomeField {
  calculation?: boolean;
  fees?: number;
  className?: string;
}
export interface IStepMyPersonalIncomeView extends PersonalIncomeField {
  control: Control;
  onSubmit: () => void;
  errors?: { [key: string]: { message?: string } };
  customSidebarText?: React.ReactNode;
  additionalFooterElement?: React.ReactNode;
  onNext: () => void;
  disabledNext: boolean;
}

export interface IInputIncome extends PersonalIncomeField {
  additionalInfo?: React.ReactNode;
  control: Control;
  name: string;
  errors?: { [key: string]: { message?: string } };
}
