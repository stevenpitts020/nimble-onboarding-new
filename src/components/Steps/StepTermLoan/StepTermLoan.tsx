import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StepTermLoanView from "./StepTermLoanView";
import { TermLoanContext } from "../../../store/TermLoan/TermLoadContext";

const StepTermLoan = () => {
  const history = useHistory();
  const { termLoanItems } = useContext(TermLoanContext);

  const goToNext = () => {
    history.push("/onboarding/term-loan-picker");
  };

  return <StepTermLoanView termLoanItems={termLoanItems} goToNext={goToNext} />;
};

export default StepTermLoan;
