import { ReactNode } from "react";
import { SET_ACTIVE_ITEM, TOGGLE_DROPDOWN_VISIBILITY } from "./actionTypes";

export interface ITermLoanItem {
  name: string;
  addText?: string;
  valuesRange: Array<number>;
  value: string;
}

export interface ITermLoanPickerItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  activeIcon: string;
}

export interface ISetActiveItemAction {
  type: typeof SET_ACTIVE_ITEM;
  payload: ITermLoanPickerItem;
}

export interface IToggleDropdownVisibility {
  type: typeof TOGGLE_DROPDOWN_VISIBILITY;
  payload: boolean;
}

export interface ITermLoan {
  termLoanItems: ITermLoanItem[];
  termLoanPickerItems: ITermLoanPickerItem[];
  activeItem: ITermLoanPickerItem;
  isShowDropdown: boolean;
  setActiveItem: (item: ITermLoanPickerItem) => void;
  toggleDropdownVisibility: (value: boolean) => void;
}

export type IAction = ISetActiveItemAction | IToggleDropdownVisibility;

export interface IProvider {
  children: ReactNode;
}
