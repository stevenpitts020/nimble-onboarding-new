import React from "react";
import { IProductOption, IProspectState } from "../../../store/reducers/type";

export interface IProductOptionsList {
  category: string;
  options: IProductOption[];
  selectOption: (option: string) => void;
}

export interface IChooseProductOptions {
  className?: string;
  style?: React.CSSProperties;
}

export interface IChooseProductOptionsView {
  prospect: IProspectState;
  handleSubmit(data: IProductOption[]): Promise<void>;
  backToProducts(): void;
}
