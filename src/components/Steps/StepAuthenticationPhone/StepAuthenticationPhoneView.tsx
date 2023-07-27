import React from "react";
import AuthFormPhone from "../../Forms/AuthFormPhone/AuthFormPhone";
import { IStepAuthenticationPhoneView } from "./types";

const StepAuthenticationPhoneView = ({
  prospect,
  handleValidation,
  handleSubmit,
}: IStepAuthenticationPhoneView) => (
  <div className="ni-step-authentication-phone">
    <AuthFormPhone
      defaultValues={prospect.signer}
      signerId={prospect.signerId}
      onValidate={handleValidation}
      onSubmit={handleSubmit}
    />
  </div>
);

export default StepAuthenticationPhoneView;
