import React from "react";
import { IProductSummaryView } from "./types";

const ProductSummaryView = ({
  showDetails,
  product,
  chooseProduct,
}: IProductSummaryView) => (
  <div className="product" onClick={showDetails} data-testid="product">
    <div className="description">
      <h3>{product.name}</h3>
      <p>{product.summary}</p>
      <button>Find out more</button>
    </div>
    <div className="product-side">
      {/* TODO uncomment and do proper verifications */}
      <div className="enroll">
        <button
          className="button is-pill is-green"
          data-testid="submitProduct"
          onClick={chooseProduct}
        >
          Enroll
        </button>
      </div>
    </div>
  </div>
);

export default ProductSummaryView;
