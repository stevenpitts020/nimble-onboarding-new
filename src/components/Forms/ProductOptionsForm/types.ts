import React from "react";
import { IProductOption as IProductOptionProspect } from "../../../store/reducers/type";

export interface IProductOptionItem {
  key: string;
  annotation?: string;
  title: string;
  lead?: string;
  value: string;
}
export interface IProductOption {
  className?: string;
  style?: React.CSSProperties;
  option: IProductOptionItem;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  isChildren?: boolean;
}
export interface IProductOptionsForm {
  className?: string;
  style?: React.CSSProperties;
  options: IProductOptionProspect[];
  onSubmit: (data: IProductOptionProspect[]) => void;
  onBack: () => void;
}
