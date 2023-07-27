import React from "react";
import { useHistory } from "react-router-dom";
import StepAreYouView from "./StepAreYouView";

const StepAreYou = () => {
  const history = useHistory();
  return (
    <StepAreYouView
      goToNextScreen={() => history.push("/onboarding/are-you-second")}
    />
  );
};

export default StepAreYou;
