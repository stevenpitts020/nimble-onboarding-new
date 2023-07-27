import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { log } from "../../../services";
import { LoadingContext } from "../../../store/LoadingContext";
import { ProspectContext } from "../../../store";
import StepChoseAmountView from "./StepChooseAmountView";
import { IAmount } from "./type";
import { IProductOption } from "../../../store/reducers/type";

const StepChooseAmount: React.FC<IAmount> = (props: IAmount) => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { prospect, updateInitialDeposit } = useContext(ProspectContext);

  const [minAmount, setMinAmount] = React.useState(100);
  const [term, setTerm] = React.useState("0");

  const usFormatter = new Intl.NumberFormat("en-US");

  React.useEffect(() => {
    const newMin = prospect.selectedProduct
      ? prospect.selectedProduct.options.find(
          (option: IProductOption) => option.key === "value_min"
        )?.value
      : null;

    const newTerm =
      prospect.products.length > 0
        ? prospect.products
            .flatMap((p) => p.options)
            .find((option) => option.category === "term")?.key
        : null;

    setMinAmount(newMin ? parseInt(newMin, 10) : 100);
    setTerm(newTerm || "");
  }, [prospect.selectedProduct, prospect.products]);

  const handleSubmit = async (amount: number) => {
    log.info(JSON.stringify(amount), "StepChooseAmount");

    setLoading(true);
    await updateInitialDeposit(amount);
    setLoading(false);

    if (prospect.inviteeToken === undefined || prospect.inviteeToken === null) {
      history.push("/onboarding/bsa-questionnaire");
    } else {
      history.push("/onboarding/success");
    }
  };

  return (
    <StepChoseAmountView
      minAmount={minAmount}
      props={props}
      handleSubmit={handleSubmit}
      prospect={prospect}
      term={term}
      usFormatter={usFormatter}
    />
  );
};
export default StepChooseAmount;
