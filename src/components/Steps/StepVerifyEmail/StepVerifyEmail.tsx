import React, { useContext, useEffect } from "react";
import { useLoading, ProspectContext } from "../../../store";
import useCreateEmailVerification from "../../../hooks/useCreateEmailVerification";
import { log } from "../../../services";
import StepVerifyEmailView from "./StepVerifyEmailView";
import { IProspectState } from "../../../store/reducers/type";

const getSignerDataFromStorage = (prospectState: IProspectState) => ({
  signerId: prospectState.signerId || "",
  email: prospectState.signer.email,
  token: prospectState.securityToken,
});

const StepVerifyEmail: React.FC = () => {
  const { setLoading } = useLoading();
  const { status, error, mutate } = useCreateEmailVerification();
  const { prospect } = useContext(ProspectContext);

  const signerData = getSignerDataFromStorage(prospect);
  const emailHost = signerData.email?.split("@")?.[1] || "";

  const onResendClick = () => {
    const { signerId, token = null } = signerData;
    log.info({ signerId, token }, "onResendClick");
    mutate({ signerId, token });
  };

  useEffect(() => {
    if (status === "success") {
      onResendClick();
    }
  }, []);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, setLoading]);

  return (
    <StepVerifyEmailView
      error={error}
      signerData={signerData}
      emailHost={emailHost}
    />
  );
};
export default StepVerifyEmail;
