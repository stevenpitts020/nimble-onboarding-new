import React from "react";
import { IProduct } from "../../../store/reducers/type";

export interface IProductDetail {
  product: IProduct;
  toggleProductDetailView: (isProductDetailVisible: boolean) => void;
  submitProduct: (productId: string, productName: string) => void;
}
export interface IProductDetailView {
  product: IProduct;
  sanitizer: any;
  chooseProduct(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  backToProductList(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void;
}
export interface IProductComponent {
  product: IProduct;
  submitProduct: (productId: string, productName: string) => void;
  showProduct: (productId: string) => void;
}
export interface IStepChooseProducts {
  className?: string;
  style?: React.CSSProperties;
}
export interface IStepChooseProductsView {
  products: IProduct[];
  props: IStepChooseProducts;
  toggleProductDetailView: React.Dispatch<React.SetStateAction<boolean>>;
  currentlyShowingProduct: IProduct;
  activeTab: string;
  onTabClick: any;
  isProductDetailVisible: boolean;
  handleSubmit(productId: string, productName: string): Promise<void>;
  showProduct(productId: string): void;
  productsFilteredByCategory(): IProduct[];
}
export interface IProductSummaryView {
  product: IProduct;
  chooseProduct(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  showDetails(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
