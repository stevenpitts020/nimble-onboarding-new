import React from "react";
import { useHistory } from "react-router-dom";
import StepAreYouSecondView from "./StepAreYouSecondView";

const StepAreYouSecond = () => {
  const history = useHistory();
  return (
    <StepAreYouSecondView
      goToNextScreen={() => history.push("/onboarding/terms-and-conditions")}
    />
  );
};

export default StepAreYouSecond;
