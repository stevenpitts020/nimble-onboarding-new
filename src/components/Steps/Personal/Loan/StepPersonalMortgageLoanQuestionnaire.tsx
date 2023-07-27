import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../../services";
import { LoadingContext } from "../../../../store/LoadingContext";

import { usePersonalMortgageLoan } from "../../../../store/Personal/Loan/PersonalMortgageLoanContext";
import { IStepPersonalMortgageQuestionnaire } from "./types";
import StepPersonalMortgageLoanQuestionnaireView from "./StepPersonalMortgageLoanQuestionnaireView";
import { IPersonalMortgageLoanQuestionnaire } from "../../../../store/Personal/Loan/types";

const StepPersonalMortgageLoanQuestionnaire: React.FC<
  IStepPersonalMortgageQuestionnaire
> = (props) => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { personalMortgageLoan, updatePersonalMortgageLoanQuestionnaire } =
    usePersonalMortgageLoan();

  const handleSubmit = async (data: IPersonalMortgageLoanQuestionnaire) => {
    setLoading(true);
    log.info(JSON.stringify(data), "StepPersonalMortgageLoanQuestionnaire");
    await updatePersonalMortgageLoanQuestionnaire(data);
    setLoading(false);

    history.push("/onboarding/success");
  };

  return (
    <StepPersonalMortgageLoanQuestionnaireView
      personalMortgageLoan={personalMortgageLoan}
      props={props}
      handleSubmit={handleSubmit}
    />
  );
};
export default StepPersonalMortgageLoanQuestionnaire;
