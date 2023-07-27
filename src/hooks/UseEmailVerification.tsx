import React from "react";
import SignerService from "../services/Signer";
import { log } from "../services";

const useEmailVerificationStatus = (
  signerId: string,
  verificationId: string,
  token: string
) => {
  const [status, setStatusPut] = React.useState("loading");
  const [error, setErrorPut] = React.useState(0);

  React.useEffect(() => {
    async function confirmEmail() {
      try {
        await SignerService.signerConfirmEmail(signerId, verificationId, token);
        setStatusPut("success");
      } catch (error: any) {
        log.error("StepConfirmEmail", error.response);
        setStatusPut(error.response.data.message);
        setErrorPut(error.response.status);
      }
    }
    confirmEmail();
  }, []);
  return { status, error };
};
export default useEmailVerificationStatus;
