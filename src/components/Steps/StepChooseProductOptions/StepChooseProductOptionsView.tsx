import React from "react";
import ProductOptionsForm from "../../Forms/ProductOptionsForm/ProductOptionsForm";
import { IChooseProductOptionsView } from "./types";

const StepChooseProductOptionsView = ({
  prospect,
  handleSubmit,
  backToProducts,
}: IChooseProductOptionsView) => (
  <div
    data-testid="StepChooseProductOptions"
    className="ni-step-signers ni-test product-options"
  >
    <h3 data-testid="SelectedProduct"> Additional Features</h3>
    <h1>Make the most of your new account</h1>
    <p className="subtitle">
      Select which additional product do you wish to add to your new{" "}
      {prospect.selectedProductName} account
    </p>
    {prospect.selectedProduct && (
      <ProductOptionsForm
        onSubmit={handleSubmit}
        options={prospect.selectedProduct.options.filter(
          (option) => option.category === "product_feature"
        )}
        onBack={backToProducts}
      />
    )}
  </div>
);

export default StepChooseProductOptionsView;
