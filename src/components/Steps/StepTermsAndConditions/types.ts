import React, { ChangeEvent } from "react";

export interface IStepTermsAndConditions {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepTermsAndConditionsView {
  props: IStepTermsAndConditions;
  isChecked: boolean;
  isOpen: boolean;
  onAction: () => void;
  onButtonClick(): void;
  onCheck(event: ChangeEvent<HTMLInputElement>): void;
}
