import React, { useContext } from "react";
import StepCompanyInformationView from "./StepCompanyInformationView";
import { ProspectContext } from "../../../store";
import { ISignerDetails } from "../../../store/reducers/type";
import { log } from "../../../services";
import { useHistory } from "react-router-dom";

const StepCompanyInformation = () => {
  const history = useHistory();
  const { prospect } = useContext(ProspectContext);

  const handleSubmit = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "StepCompanyInformation");

    history.push("/onboarding/are-you");
  };
  return (
    <StepCompanyInformationView
      defaultValues={prospect.signer}
      onSubmit={handleSubmit}
      goToNextScreen={() =>
        history.push("/onboarding/company-information-parent")
      }
    />
  );
};

export default StepCompanyInformation;