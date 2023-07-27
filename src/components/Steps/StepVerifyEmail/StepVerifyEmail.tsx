import React, { useContext } from "react";
import "./StepVerifyEmail.sass";
import { useHistory } from "react-router-dom";
import { useLoading, ProspectContext } from "../../../store";
import useCreateEmailVerification from "../../../hooks/useCreateEmailVerification";
import { log } from "../../../services";
import StepVerifyEmailView from "./StepVerifyEmailView";
import { IStep } from "./types";
import { IProspectState } from "../../../store/reducers/type";

const getSignerDataFromStorage = (prospectState: IProspectState) => ({
  signerId: prospectState.signerId || "",
  email: prospectState.signer.email,
  token: prospectState.securityToken,
});

const StepVerifyEmail: React.FC<IStep> = (props: IStep) => {
  const history = useHistory();
  const { setLoading } = useLoading();
  const { status, error, mutate } = useCreateEmailVerification();
  const { prospect } = useContext(ProspectContext);

  const signerData = getSignerDataFromStorage(prospect);

  React.useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, setLoading]);

  const onResendClick = () => {
    const { signerId, token = null } = signerData;
    log.info({ signerId, token }, "onResendClick");
    mutate({ signerId, token });
  };

  const onFinishClick = () => {
    log.info("Go to Next Step", "StepVerifyEmail");
    sessionStorage.removeItem("BSA");
    history.push("/onboarding/other-applicants");
  };

  return (
    <StepVerifyEmailView
      props={props}
      error={error}
      onFinishClick={onFinishClick}
      onResendClick={onResendClick}
      signerData={signerData}
      status={status}
    />
  );
};
export default StepVerifyEmail;
