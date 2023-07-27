import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import { ProspectContext } from "../../../store";
import "./StepInvites.sass";
import { SIGNER_ROLES } from "./constants";
import { IFormRepeatableSigners } from "../../Forms/InvitesForm/RepeatableSigner/types";
import { IStepInvites } from "./types";
import StepInvitesView from "./StepInvitesView";

const StepInvites: React.FC<IStepInvites> = (props) => {
  const history = useHistory();
  const { prospect, setInvitees } = useContext(ProspectContext);

  const { invitees = [], selectedProductName = "" } = prospect;
  const [showMessage, setShowMessage] = useState(
    invitees.some((i) => i.role === SIGNER_ROLES.PRIMARY)
  );
  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);

  const onChangePrimaryRole = (isPrimaryChecked: boolean) => {
    setShowMessage(isPrimaryChecked);
  };

  /* go to the next step and don't invite anyone */
  const handleSkip = () => {
    log.info("Skipped", "StepInvites");
    goToNextStep();
  };

  const handleBack = () => {
    history.goBack();
  };

  const goToNextStep = () => {
    prospect?.selectedProduct?.category === "CARD"
      ? history.push("/onboarding/personal-mortgage-loan-configuration")
      : prospect.selectedProduct?.category === "LOAN"
      ? history.push("/onboarding/personal-mortgage-loan-configuration")
      : history.push("/onboarding/success");
  };

  /** after submit, post to server and get response */
  const onSubmitForm = async (data: IFormRepeatableSigners) => {
    log.info(JSON.stringify(data), "Submit on StepInvites!");

    setInvitees(data.signers);
    goToNextStep();
  };

  return (
    <StepInvitesView
      props={props}
      invitees={invitees}
      prospect={prospect}
      handleBack={handleBack}
      handleSkip={handleSkip}
      onChangePrimaryRole={onChangePrimaryRole}
      onSubmitForm={onSubmitForm}
      selectedProductName={selectedProductName}
      showMessage={showMessage}
    />
  );
};
export default StepInvites;
