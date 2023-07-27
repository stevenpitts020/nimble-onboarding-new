import React from "react";
import SignerService from "../services/Signer";
import { log } from "../services";
import { IVerifyEmail } from "../services/types";

const useCreateEmailVerification = () => {
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState<string | null>(null);

  const validateEmailVerification = ({ signerId, token }: IVerifyEmail) => {
    if (signerId === null || signerId === "" || token == null) {
      log.error({ signerId, token }, "validateEmailVerification hook");
      setError(
        "Sorry, missing information to send the email. Please try later."
      );
      setStatus("failure");
      return false;
    }
    return true;
  };

  const mutate = async ({ signerId, token }: IVerifyEmail) => {
    setStatus("loading");

    if (!validateEmailVerification({ signerId, token })) {
      return;
    }

    try {
      await SignerService.createEmailVerification({ signerId, token });
      setStatus("success");
    } catch (error: any) {
      log.error(error.response.data.message, "useCreateEmailVerification hook");
      setError(error.response.data.message);
      setStatus("failure");
    }
  };

  return { status, error, mutate };
};
export default useCreateEmailVerification;
