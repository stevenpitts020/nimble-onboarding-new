import React from "react";
import { IInstitution } from "../../../NimbleRouter";
import { IProspectState } from "../../../store/reducers/type";

export interface IStepOnboardingComplete {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}
export interface IStepOnboardingCompleteView {
  name: string;
  props: IStepOnboardingComplete;
  prospect: IProspectState;
  institution: IInstitution | undefined;
  handleRestart(): void;
}
