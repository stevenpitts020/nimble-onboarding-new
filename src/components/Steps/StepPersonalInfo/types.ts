import React from "react";
import { IProspectState, ISignerDetails } from "../../../store/reducers/type";

export interface IStepPersonalInfo {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepPersonalInfoView {
  props: IStepPersonalInfo;
  prospect: IProspectState;
  handleSubmit(data: ISignerDetails): Promise<void>;
  handleValidation(data: ISignerDetails): Promise<any>;
}
