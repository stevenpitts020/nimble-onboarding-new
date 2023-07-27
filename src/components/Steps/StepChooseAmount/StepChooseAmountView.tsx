import React from "react";
import AmountForm from "../../Forms/AmountForm/AmountForm";
import { IAmountView } from "./type";

const StepChoseAmountView = ({
  props,
  prospect,
  usFormatter,
  minAmount,
  handleSubmit,
  term,
}: IAmountView) => (
  <div
    data-testid="StepChooseAmount"
    className="ni-step-signers ni-test amount"
    style={props.style}
  >
    <h3 data-testid="SelectedProduct">{prospect.selectedProductName}</h3>
    <h1 className="ni-step-choose-amount">
      What will be your initial deposit amount?
    </h1>
    <p>
      To open your {prospect.selectedProductName} account a minimum of $
      {usFormatter.format(minAmount)} of initial deposit is required.
    </p>
    <AmountForm
      onSubmit={handleSubmit}
      min={minAmount}
      category={prospect.selectedProduct?.category}
      productOptions={prospect.selectedProduct?.options}
      term={term}
    />
  </div>
);

export default StepChoseAmountView;
