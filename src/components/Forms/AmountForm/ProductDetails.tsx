import React from "react";
import "./AmountForm.sass";
import { IProductDetails } from "./types";

const ProductDetails: React.FC<IProductDetails> = (props: IProductDetails) => (
  <div>
    {props.category === "CD" && (
      <div className="product-details">
        <div>
          <label>Interest Rate</label>
          <span>{props.interestRate}%</span>
        </div>
        <div>
          <label>APY</label>
          <span>{props.apy}%</span>
        </div>
      </div>
    )}
  </div>
);
export default ProductDetails;
