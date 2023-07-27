import React from "react";
import { useHistory } from "react-router-dom";
import StepCoApplicantView from "./StepCoApplicantView";

const StepCoApplicant = () => {
  const history = useHistory();
  const handleClickCard = () => {
    history.push("/onboarding/second-co-applicant");
  };
  return <StepCoApplicantView handleClickCard={handleClickCard} />;
};

export default StepCoApplicant;
