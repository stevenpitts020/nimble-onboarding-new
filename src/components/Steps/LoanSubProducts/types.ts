export interface IAccountOrProductsView {
  onClick: () => void;
}
export interface ICardsLoan {
  title: string;
  subtitle: string;
  subtitleSecond: string;
  image: string;
}

export interface ICardsLoanBack {
  onClick: () => void;
  title: string;
  subtitle: string;
  image: string;
}
export interface IFlipCardLoan {
  onClick: () => void;
  image: string;
  title: string;
  subtitle: string;
  subtitleSecond: string;
  imageBack: string;
}
