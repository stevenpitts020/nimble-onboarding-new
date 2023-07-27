import React from "react";
import ButtonList from "../../ButtonList/ButtonList";
import { IStepOnboardingCompleteView } from "./types";

const StepOnboardingCompleteView = ({
  props,
  prospect,
  handleRestart,
  institution,
  name,
}: IStepOnboardingCompleteView) => (
  <div
    data-testid="StepOnboardingComplete"
    className={`ni-step-onboarding-complete ${props.className}`}
    style={props.style}
  >
    <h3 data-testid="StepOnboardingCompleteTitle">Hello {name}</h3>
    <h2>
      It seems that you already completed your account request application!
    </h2>
    <p>
      If you didn’t apply or completed the onboarding process for a{" "}
      {prospect.selectedProductName} account please contact our team by clicking
      the “Need Help” Button.
    </p>

    <ButtonList
      handleRestart={handleRestart}
      institution={institution?.domain}
      className="completed"
    />
  </div>
);

export default StepOnboardingCompleteView;
