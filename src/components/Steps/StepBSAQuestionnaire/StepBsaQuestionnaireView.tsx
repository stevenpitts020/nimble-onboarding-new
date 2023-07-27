import React from "react";
import BSAForm from "../../Forms/BSAForm/BSAForm";
import { IStepBsaQuestionnaireView } from "./types";

const StepBsaQuestionnaireView = ({
  props,
  handleSubmit,
  bsa,
  questions,
}: IStepBsaQuestionnaireView) => (
  <div
    data-testid="step-bsa-questionnaire"
    className="ni-step-bsa ni-test"
    style={props.style}
  >
    <h3>Almost there...</h3>
    <h1>Please complete our questionnaire </h1>
    <BSAForm
      onSubmit={handleSubmit}
      defaultValues={bsa.results}
      questions={questions}
    />
  </div>
);

export default StepBsaQuestionnaireView;
