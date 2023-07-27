import React from "react";
import PersonalMortgageForm from "../../../Forms/Personal/Loan/PersonalMortgageForm";
import { IStepPersonalMortgageQuestionnaireView } from "./types";

const StepPersonalMortgageLoanQuestionnaireView = ({
  props,
  handleSubmit,
  personalMortgageLoan,
}: IStepPersonalMortgageQuestionnaireView) => (
  <div
    data-testid="step-personal-mortgage-loan-questionnaire"
    className="ni-step-bsa ni-test"
    style={props.style}
  >
    <h3>We need a little bit of information to get started...</h3>
    <h1>Please complete our questionnaire </h1>
    <PersonalMortgageForm
      onSubmit={handleSubmit}
      defaultValues={personalMortgageLoan.results}
    />
  </div>
);

export default StepPersonalMortgageLoanQuestionnaireView;
