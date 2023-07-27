import React from "react";
import {
  IProductConfiguration,
  IProductOption,
} from "../../../store/reducers/type";

export interface IAmountForm {
  className?: string;
  style?: React.CSSProperties;
  onSubmit: (data: number) => void;
  category?: string;
  min: number;
  max?: string;
  term?: string;
  productOptions?: IProductOption[];
}

export interface IProductDetails {
  apy: string;
  interestRate: string;
  category?: string;
}
export interface IAmountFormView {
  props: IAmountForm;
  handleSubmit: any;
  onFormSubmit(data: IProductConfiguration): void;
}
