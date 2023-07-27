import React from "react";
import { IState } from "../../../store/BsaContextType";

export interface IStepBSAQuestionnaire {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepBsaQuestionnaireView {
  props: React.PropsWithChildren<IStepBSAQuestionnaire>;
  bsa: IState;
  questions: any;
  handleSubmit(data: any): Promise<void>;
}
