import React, { useState } from "react";
import "./StepTermsAndConditions.sass";
import { useHistory } from "react-router-dom";
import { useConsents } from "../../../store";
import { IStepTermsAndConditions } from "./types";
import StepTermsAndConditionsView from "./StepVerifyEmailView";

const StepTermsAndConditions: React.FC<IStepTermsAndConditions> = (
  props: IStepTermsAndConditions
) => {
  const history = useHistory();
  const { updateConsent } = useConsents();
  const [isChecked, setIsChecked] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onButtonClick = () => {
    if (isChecked) {
      updateConsent("terms", true);
      history.push("/onboarding/capture-documents");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <StepTermsAndConditionsView
      props={props}
      isChecked={isChecked}
      onButtonClick={onButtonClick}
      onCheck={() => setIsChecked(!isChecked)}
      isOpen={isOpen}
      onAction={() => setIsOpen(false)}
    />
  );
};
export default StepTermsAndConditions;
