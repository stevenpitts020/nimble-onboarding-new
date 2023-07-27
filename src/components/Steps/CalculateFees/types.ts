import { Control } from "react-hook-form";
import { IFundsDateField } from "../FundsDueDate/types";
import { PersonalIncomeField } from "../MyPersonalIncome/types";

export interface ICalculateFeesView
  extends IFundsDateField,
    PersonalIncomeField {
  additionalInfoForFees: React.ReactNode;
  control: Control;
  onSubmit: () => void;
  errors?: { [key: string]: { message?: string } };
  onNext?: () => void;
}
