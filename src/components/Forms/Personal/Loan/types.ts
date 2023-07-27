import React from "react";
import { IPersonalMortgageLoanQuestionnaire } from "../../../../store/Personal/Loan/types";

export interface IPersonalMortgageForm {
  className?: string;
  style?: React.CSSProperties;
  defaultValues: IPersonalMortgageLoanQuestionnaire;
  onSubmit: (data: IPersonalMortgageLoanQuestionnaire) => void;
}
