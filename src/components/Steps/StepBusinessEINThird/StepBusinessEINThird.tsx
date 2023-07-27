import React from "react";
import { useHistory } from "react-router-dom";
import StepBusinessEinThirdView from "./StepBusinessEINThirdView";

const StepBusinessEinThird = () => {
  const history = useHistory();
  const goToNext = () => {
    history.push("/onboarding/company-information");
  };
  return <StepBusinessEinThirdView goToNext={goToNext} />;
};

export default StepBusinessEinThird;
