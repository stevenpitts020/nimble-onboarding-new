import React from "react";
import { useParams } from "react-router-dom";
import useEmailVerificationStatus from "../../hooks/UseEmailVerification";
import useCreateEmailVerification from "../../hooks/useCreateEmailVerification";
import { log } from "../../services";
import "./ConfirmEmail.sass";
import ConfirmEmailView from "./ConfirmEmailView";
import { IConfirmEmail, IParamsTypes } from "./types";

const ConfirmEmail: React.FC<IConfirmEmail> = (props: IConfirmEmail) => {
  const { signerId, verificationId } = useParams<IParamsTypes>();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";
  const { status, mutate, error } = useCreateEmailVerification();
  const { status: statusPut, error: errorPut } = useEmailVerificationStatus(
    signerId,
    verificationId,
    token
  );

  const handleResend = () => {
    log.info({ signerId, token }, "onResendClick");
    mutate({ signerId, token });
  };
  return (
    <ConfirmEmailView
      props={props}
      error={error}
      errorPut={errorPut}
      handleResend={handleResend}
      statusPut={statusPut}
      status={status}
    />
  );
};
export default ConfirmEmail;
