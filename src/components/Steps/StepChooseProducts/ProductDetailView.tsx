import React from "react";
import { ArrowLeft, Check } from "react-feather";
import { IProductDetailView } from "./types";

const ProductDetailView = ({
  backToProductList,
  chooseProduct,
  sanitizer,
  product,
}: IProductDetailView) => (
  <div className="product-detail">
    <div className="product-detail-nav">
      <button className="back" onClick={backToProductList}>
        <ArrowLeft color="#ABAFB3" />
        Back
      </button>
      <button
        className="button is-pill is-green"
        data-testid="enroll-nav"
        onClick={chooseProduct}
      >
        <Check />
        Enroll
      </button>
    </div>
    <div className="product-detail-content">
      <h1>{product.name}</h1>
      <div
        className="content"
        data-testid="content"
        dangerouslySetInnerHTML={{ __html: sanitizer(product.content) }}
      />
    </div>
    <button
      className="button is-pill is-green enroll-bottom"
      data-testid="enroll-bottom"
      onClick={chooseProduct}
    >
      <Check />
      Enroll
    </button>
  </div>
);

export default ProductDetailView;
