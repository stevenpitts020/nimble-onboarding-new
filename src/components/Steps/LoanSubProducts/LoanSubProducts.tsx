import React from "react";
import LoanSubProductsView from "./LoanSubProductsView";
import { useHistory } from "react-router-dom";

const LoanSubProducts = () => {
  const history = useHistory();
  const goToNext = () => {
    if (sessionStorage.getItem("AccountType") === "Business") {
      history.push("/onboarding/business-ein");
    } else {
      history.push("/onboarding/introduction");
    }
  };
  return <LoanSubProductsView onClick={goToNext} />;
};

export default LoanSubProducts;
