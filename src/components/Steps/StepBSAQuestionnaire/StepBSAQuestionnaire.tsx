import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import { LoadingContext } from "../../../store/LoadingContext";

import { InstitutionContext, useBsa } from "../../../store";
import { IStepBSAQuestionnaire } from "./types";
import StepBsaQuestionnaireView from "./StepBsaQuestionnaireView";

const StepBSAQuestionnaire: React.FC<IStepBSAQuestionnaire> = (props) => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { bsa, updateBsa } = useBsa();
  const institution = useContext(InstitutionContext);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    log.info(JSON.stringify(data), "StepBSAQuestionnaire");
    await updateBsa(data);
    setLoading(false);

    history.push("/onboarding/invite-signers");
  };

  return (
    <StepBsaQuestionnaireView
      bsa={bsa}
      handleSubmit={handleSubmit}
      props={props}
      questions={institution?.publicMetadata?.bsa}
    />
  );
};
export default StepBSAQuestionnaire;
