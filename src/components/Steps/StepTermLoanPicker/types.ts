import { ITermLoan } from "../../../store/TermLoan/types";
import { Dispatch, SetStateAction } from "react";

export interface IStepTermLoanPickerView {
  termLoanPickerItems: ITermLoan["termLoanPickerItems"];
  activeItem: ITermLoan["activeItem"];
  setActiveItem: ITermLoan["setActiveItem"];
  goNext: () => void;
}

export interface IDropdownItems
  extends Omit<IStepTermLoanPickerView, "goNext"> {
  props?: any;
  setData: Dispatch<SetStateAction<any>>;
  data: ICardList;
}
export interface ICard {
  requestPrice: number;
  id: number;
  type: string;
  price: number;
  address: string;
  activeItem: ITermLoan["activeItem"];
}
export type ICardList = ICard[];

export interface IDropdownList {
  list: ITermLoan["termLoanPickerItems"];
}
