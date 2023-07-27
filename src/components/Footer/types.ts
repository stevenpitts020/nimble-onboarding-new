export interface IFooterViewProps {
  customNextButtonName?: string;
  showNextButton?: boolean;
  showBackButton?: boolean;
  goToNext: () => void;
  goToBack: () => void;
}

export interface ITips {
  show?: boolean;
}
