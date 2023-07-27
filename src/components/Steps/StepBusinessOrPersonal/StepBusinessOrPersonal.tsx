import React from "react";
import { useHistory } from "react-router-dom";
import StepBusinessOrPersonalView from "./StepBusinessOrPersonalView";
import flow from "../../../services/Flow";
import "./StepBusinessOrPersonal.sass";

const StepBusinessOrPersonal = () => {
  const history = useHistory();

  const goToNext = (card) => {
    if (sessionStorage.getItem("AccountType") === "Business") {
      history.push("/onboarding/business-ein");
    } else {
      // TODO: - temp solution before saving choosen card
      if (flow.isMainOnboarding() && card === "term-loan") {
        history.push("/onboarding/term-loan");
      } else {
        history.push("/onboarding/capture-documents");
      }
    }
  };
  return <StepBusinessOrPersonalView onClick={goToNext} />;
};

export default StepBusinessOrPersonal;
