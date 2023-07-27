import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import StepTermsAndConditionsView from "./StepTermsAndConditionsView";
import "./StepTermsAndConditions.sass";
import { useConsents } from "../../../store";

const StepTermsAndConditions = () => {
  const history = useHistory();
  const [activeDisclosure, setActiveDisclosure] = useState("0");

  const { updateConsent } = useConsents();

  const onConsent = useCallback(() => {
    updateConsent("terms", true);
    history.goBack();
  }, [updateConsent]);

  return (
    <StepTermsAndConditionsView
      activeDisclosure={activeDisclosure}
      setActiveDisclosure={setActiveDisclosure}
      onConsent={onConsent}
    />
  );
};
export default StepTermsAndConditions;
