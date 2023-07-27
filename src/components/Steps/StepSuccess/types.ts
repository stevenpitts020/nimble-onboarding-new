import React from "react";
import animationData from "../../../animations/checked-done.json";
import { IInstitution } from "../../../NimbleRouter";

export interface IStepSuccess {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}
export interface IStepSuccessView {
  props: IStepSuccess;
  institution: IInstitution | undefined;
  handleRestart(): void;
}

export const animationOptions = {
  autoplay: true,
  loop: false,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
