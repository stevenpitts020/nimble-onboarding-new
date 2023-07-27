import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StepBusinessEinSecondView from "./StepBusinessEINSecondView";
import { ProspectContext } from "../../../store";
import { ISignerDetails } from "../../../store/reducers/type";
import { log } from "../../../services";

const StepBusinessEinSecond = () => {
  const history = useHistory();
  const { prospect } = useContext(ProspectContext);

  const handleSubmit = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "StepBusinessEinSecond");
    history.push("/onboarding/company-information-parent");
  };
  return (
    <StepBusinessEinSecondView
      defaultValues={prospect.signer}
      onSubmit={handleSubmit}
      goToNextScreen={() =>
        history.push("/onboarding/company-information-parent")
      }
      goToNextScreenIfEmpty={() =>
        history.push("/onboarding/business-ein-third")
      }
    />
  );
};

export default StepBusinessEinSecond;
