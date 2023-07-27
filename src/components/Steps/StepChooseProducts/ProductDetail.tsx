import React from "react";
import dompurify from "dompurify";
import { IProductDetail } from "./types";
import ProductDetailView from "./ProductDetailView";

const ProductDetail: React.FC<IProductDetail> = ({
  product,
  toggleProductDetailView,
  submitProduct,
}) => {
  const chooseProduct = () => {
    submitProduct(product.id, product.name);
  };

  const backToProductList = () => {
    toggleProductDetailView(false);
  };

  const sanitizer = dompurify.sanitize;

  return (
    <ProductDetailView
      product={product}
      chooseProduct={chooseProduct}
      backToProductList={backToProductList}
      sanitizer={sanitizer}
    />
  );
};
export default ProductDetail;
