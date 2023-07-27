import React from "react";
import { IStepBSAQuestionnaire } from "../StepBSAQuestionnaire/types";
import { IState } from "../../../store/BsaContextType";

export interface IStepCaptureDocuments {
  className?: string;
  style?: React.CSSProperties;
}
export interface IStepCaptureDocumentsView {
  props: React.PropsWithChildren<IStepBSAQuestionnaire>;
  bsa: IState;
  handleSubmit(data: any): Promise<void>;
}
