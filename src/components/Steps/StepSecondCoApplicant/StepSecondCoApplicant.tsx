import React, { useContext } from "react";
import StepSecondCoApplicantView from "./StepSecondCoApplicantView";
import { useHistory } from "react-router-dom";
import { ProspectContext } from "../../../store";
import { useLayout } from "../../../store/LayoutContext";
const StepSecondCoApplicant = () => {
  const history = useHistory();
  const { prospect } = useContext(ProspectContext);
  const goToNextStep = () => {
    prospect?.selectedProduct?.category === "CARD"
      ? history.push("/onboarding/personal-mortgage-loan-configuration")
      : prospect.selectedProduct?.category === "LOAN"
      ? history.push("/onboarding/personal-mortgage-loan-configuration")
      : history.push("/onboarding/term-loan");
  };
  useLayout({
    goToNext: goToNextStep,
    customNextButtonName: "I am not inviting any others right now",
  });
  return (
    <div
      data-testid="StepSecondApplicant"
      className="ni-step-business-or-personal"
    >
      <StepSecondCoApplicantView goToNextStep={goToNextStep} />
    </div>
  );
};

export default StepSecondCoApplicant;
