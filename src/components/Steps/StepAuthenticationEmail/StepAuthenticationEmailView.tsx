import React from "react";
import AuthFormEmail from "../../Forms/AuthFormEmail/AuthFormEmail";
import { IStepAuthenticationEmailView } from "./types";

const StepAuthenticationEmailView = ({
  prospect,
  handleValidation,
  handleSubmit,
}: IStepAuthenticationEmailView) => (
  <div className="ni-step-authentication-email">
    <AuthFormEmail
      defaultValues={prospect.signer}
      signerId={prospect.signerId}
      onValidate={handleValidation}
      onSubmit={handleSubmit}
    />
  </div>
);

export default StepAuthenticationEmailView;
