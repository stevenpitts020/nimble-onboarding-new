import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StepTermLoanPickerView from "./StepTermLoanPickerView";
import { TermLoanContext } from "../../../store/TermLoan/TermLoadContext";

const StepTermLoanPicker = () => {
  const { termLoanPickerItems, activeItem, setActiveItem } =
    useContext(TermLoanContext);

  console.log("termLoanPickerItems", termLoanPickerItems);
  const history = useHistory();

  const goNext = () => {
    history.push("/onboarding/document-agreement");
  };

  return (
    <StepTermLoanPickerView
      termLoanPickerItems={termLoanPickerItems}
      activeItem={activeItem}
      goNext={goNext}
      setActiveItem={setActiveItem}
    />
  );
};

export default StepTermLoanPicker;
