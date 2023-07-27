import React from "react";
import { IProspectState } from "../../../store/reducers/type";

export interface IAmount {
  className?: string;
  style?: React.CSSProperties;
}
export interface IAmountView {
  props: IAmount;
  minAmount: number;
  prospect: IProspectState;
  term: string;
  usFormatter: Intl.NumberFormat;
  handleSubmit(amount: number): Promise<void>;
}
