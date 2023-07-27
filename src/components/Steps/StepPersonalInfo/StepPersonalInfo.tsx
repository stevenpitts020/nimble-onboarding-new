import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import { ProspectContext, useDocumentState } from "../../../store";
import "./StepPersonalInfo.sass";
import { LoadingContext } from "../../../store/LoadingContext";
import StepPersonalInfoView from "./StepPersonalInfoView";
import { IStepPersonalInfo } from "./types";
import { ISignerDetails } from "../../../store/reducers/type";

const StepPersonalInfo: React.FC<IStepPersonalInfo> = (
  props: IStepPersonalInfo
) => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);

  const { prospect, validateSigner, updateSigner } =
    useContext(ProspectContext);
  // documents
  const { documents } = useDocumentState();
  const { front, back } = documents;

  React.useEffect(() => {
    const checkIfDocumentsPresent = () => {
      if (front) {
        log.info("We have photos", "StepPersonalInfo");
        return true;
      }
      return false;
    };

    if (!checkIfDocumentsPresent()) {
      log.error("We are missing documents in state", "StepPersonalInfo");
      history.push("/onboarding");
    }
  }, [front, back, history]);

  // Validation to check for duplications between multiple signers on an application
  const handleValidation = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "StepPersonalInfo");

    return await validateSigner({ ...data });
  };

  /** after submit, post to server and get response */
  const handleSubmit = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "StepPersonalInfo");

    // We only allow validated prospects to progress
    if (prospect.signer.validated) {
      setLoading(true);
      // update state
      await updateSigner({ ...prospect.signer, ...data });
      setLoading(false);
      history.push("/onboarding/choose-products");
    }
  };

  return (
    <StepPersonalInfoView
      props={props}
      prospect={prospect}
      handleSubmit={handleSubmit}
      handleValidation={handleValidation}
    />
  );
};
export default StepPersonalInfo;
