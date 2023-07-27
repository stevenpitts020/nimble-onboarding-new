import React from "react";
import { AlertCircle } from "react-feather";
import ProspectForm from "../../Forms/ProspectForm/ProspectForm";
import { IStepPersonalInfoView } from "./types";

const StepPersonalInfoView = ({
  props,
  prospect,
  handleValidation,
  handleSubmit,
}: IStepPersonalInfoView) => (
  <div
    data-testid="StepPersonalInfo"
    className={`ni-step-personal-info ${props.className}`}
    style={props.style}
  >
    {prospect.error && (
      <div role="alert" className="alert toast is-error">
        <AlertCircle /> {prospect.error}
      </div>
    )}
    <h1 className="text-center">
      <small>Please Review your</small>
      Personal Information
    </h1>
    <ProspectForm
      defaultValues={prospect.signer}
      signerId={prospect.signerId}
      onValidate={handleValidation}
      onSubmit={handleSubmit}
      invitee={!prospect.inviteeToken}
    />
  </div>
);

export default StepPersonalInfoView;
