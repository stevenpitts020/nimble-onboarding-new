import React from "react";
import ProductSummaryView from "./ProductSummaryView";
import { IProductComponent } from "./types";

const ProductSummary: React.FC<IProductComponent> = ({
  product,
  submitProduct,
  showProduct,
}) => {
  const chooseProduct = () => {
    submitProduct(product.id, product.name);
  };
  const showDetails = () => {
    showProduct(product.id);
  };

  return (
    <ProductSummaryView
      product={product}
      chooseProduct={chooseProduct}
      showDetails={showDetails}
    />
  );
};
export default ProductSummary;
