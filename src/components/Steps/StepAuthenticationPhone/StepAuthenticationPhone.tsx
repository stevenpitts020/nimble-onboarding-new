import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StepAuthenticationPhoneView from "./StepAuthenticationPhoneView";
import { LoadingContext } from "../../../store/LoadingContext";
import { ProspectContext } from "../../../store";
import { ISignerDetails } from "../../../store/reducers/type";
import { log } from "../../../services";
import "./StepAuthenticationPhone.sass";

const StepAuthenticationPhone = () => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);

  const { prospect, validateSigner, updateSigner } =
    useContext(ProspectContext);

  const handleValidation = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "StepAuthenticationPhone");

    return validateSigner({ ...data });
  };

  const handleSubmit = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "StepAuthenticationPhone");

    // We only allow validated prospects to progress
    if (prospect.signer.validated) {
      setLoading(true);
      // update state
      updateSigner({ ...prospect.signer, ...data, consent: true });
      setLoading(false);
      history.push("/onboarding/verify-number");
    }
  };
  return (
    <StepAuthenticationPhoneView
      prospect={prospect}
      handleSubmit={handleSubmit}
      handleValidation={handleValidation}
    />
  );
};

export default StepAuthenticationPhone;
