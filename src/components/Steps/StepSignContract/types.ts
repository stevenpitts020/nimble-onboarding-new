import React from "react";
import { IProspectState } from "../../../store/reducers/type";

export interface IStep {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepView {
  props: IStep;
  prospect: IProspectState;
  handleSign(): void;
}
