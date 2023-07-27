import { ITermLoan, ITermLoanItem } from "../../../store/TermLoan/types";

export interface IStepTermLoanView {
  termLoanItems: ITermLoan["termLoanItems"];
  goToNext: () => void;
}

export interface ITermLoanItemProps extends ITermLoanItem {
  isLast: boolean;
}
