import { Dispatch, SetStateAction } from "react";
import { ProductSubProductCards } from "./enum";

export interface IAccountOrProducts {
  onClick: (card) => void;
}
export interface IAccountOrProductCards {
  onClick?: (card) => void;
  isMouseOnToggle?: boolean;
  setIsMouseOnToggle?: Dispatch<SetStateAction<boolean>>;
  title: string;
  subtitle: string;
  isSwitch?: boolean;
  renderIcon: () => JSX.Element;
}

export interface IAccountOrProductCardsBack {
  onClick?: () => void;
  title: string;
  subtitle: string;
  image?: string;
}
export interface IFlipCardProducts {
  onClick?: () => void;
  title: ProductSubProductCards;
  subtitle: string;
  isFlipped: boolean;
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
  setIsDoubleFlipped: Dispatch<SetStateAction<boolean>>;
  renderCardsSubProduct: () => JSX.Element;
  renderLoanSubProduct: () => JSX.Element;
  renderDepositSubProduct: () => JSX.Element;
  chosenCard: ProductSubProductCards;
  setChosenCard: Dispatch<SetStateAction<ProductSubProductCards>>;
  isDoubleFlipped: boolean;
  renderIcon: () => JSX.Element;
  isMouseOnToggle: boolean;
}

export interface INavbar {
  isActive: ProductSubProductCards;
  setIsActive: Dispatch<SetStateAction<ProductSubProductCards>>;
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
  isNotChangeHeader: boolean;
  setIsNotChangeHeader: Dispatch<SetStateAction<boolean>>;
  title: string[];
  type: string;
  isFlipped: boolean;
}
