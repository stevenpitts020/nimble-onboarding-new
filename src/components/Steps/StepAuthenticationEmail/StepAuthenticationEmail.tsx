import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StepAuthenticationEmailView from "./StepAuthenticationEmailView";
import { ISignerDetails } from "../../../store/reducers/type";
import { LoadingContext } from "../../../store/LoadingContext";
import { ProspectContext } from "../../../store";
import { log } from "../../../services";
import "./StepAuthenticationEmail.sass";

const StepAuthenticationEmail = () => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);

  const { prospect, validateSigner, updateSigner } =
    useContext(ProspectContext);

  const handleValidation = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "StepAuthenticationEmail");
    await validateSigner({ ...data });
  };

  const handleSubmit = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "StepAuthenticationEmail");
    // We only allow validated prospects to progress
    if (prospect.signer.validated) {
      setLoading(true);
      // update state
      await updateSigner({ ...prospect.signer, ...data, consent: true });
      setLoading(false);
      history.push("/onboarding/verify-number");
    }
  };
  return (
    <StepAuthenticationEmailView
      prospect={prospect}
      handleSubmit={handleSubmit}
      handleValidation={handleValidation}
    />
  );
};

export default StepAuthenticationEmail;
