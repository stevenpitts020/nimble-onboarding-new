import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import { LoadingContext } from "../../../store/LoadingContext";
import { ProspectContext } from "../../../store";
import "./StepChooseProductOptions.sass";
import StepChooseProductOptionsView from "./StepChooseProductOptionsView";
import { IChooseProductOptions } from "./types";
import { IProductOption } from "../../../store/reducers/type";

const StepChooseProductOptions: React.FC<IChooseProductOptions> = () => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { prospect, updateProductOptions } = useContext(ProspectContext);

  const backToProducts = () => {
    history.goBack();
  };

  // ISSUE-33 Begin
  const { updateInitialDeposit } = useContext(ProspectContext);
  const chooseAmountFlow = async () => {
    await updateInitialDeposit(0);

    if (prospect.inviteeToken === undefined || prospect.inviteeToken === null) {
      history.push("/onboarding/bsa-questionnaire");
    } else {
      history.push("/onboarding/success");
    }
  };
  // ISSUE-33 End

  const handleSubmit = async (data: IProductOption[]) => {
    setLoading(true);
    log.info(JSON.stringify(data), "StepChooseProductOptions");
    updateProductOptions(data);
    setLoading(false);
    if (prospect.selectedProduct !== undefined) {
      if (prospect.selectedProduct.category === "CARD") {
        history.push("/onboarding/bsa-questionnaire");
      } else if (prospect.selectedProduct.category === "LOAN") {
        history.push("/onboarding/bsa-questionnaire");
      } else {
        chooseAmountFlow();
      }
    }
  };
  return (
    <StepChooseProductOptionsView
      prospect={prospect}
      handleSubmit={handleSubmit}
      backToProducts={backToProducts}
    />
  );
};
export default StepChooseProductOptions;
