import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./StepOnboardingComplete.sass";
import { ProspectContext, InstitutionContext } from "../../../store";
import { log } from "../../../services";
import StepOnboardingCompleteView from "./StepOnboardingCompleteView";
import { IStepOnboardingComplete } from "./types";

const StepOnboardingComplete: React.FC<IStepOnboardingComplete> = (props) => {
  const history = useHistory();
  const { prospect, resetProspect } = useContext(ProspectContext);
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const institution = useContext(InstitutionContext);
  const handleRestart = () => {
    log.info("Restart Process", "StepSuccess");
    resetProspect();
    history.push("/onboarding");
  };

  return (
    <StepOnboardingCompleteView
      props={props}
      prospect={prospect}
      institution={institution}
      handleRestart={handleRestart}
      name={name || ""}
    />
  );
};
export default StepOnboardingComplete;
