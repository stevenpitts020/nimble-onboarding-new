import React from "react";
import {
  IPersonalMortgageLoanQuestionnaire,
  IState,
} from "../../../../store/Personal/Loan/types";

export interface IStepPersonalMortgageQuestionnaire {
  className?: string;
  style?: React.CSSProperties;
}
export interface IStepPersonalMortgageQuestionnaireView {
  personalMortgageLoan: IState;
  props: React.PropsWithChildren<IStepPersonalMortgageQuestionnaire>;
  handleSubmit(data: IPersonalMortgageLoanQuestionnaire): Promise<void>;
}
