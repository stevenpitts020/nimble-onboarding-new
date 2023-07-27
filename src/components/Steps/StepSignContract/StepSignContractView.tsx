import React from "react";
import { AlertCircle, ArrowRight } from "react-feather";
import { IStepView } from "./types";
import Button from "../../Common/Button/Button";

const StepSignContractView = ({ props, prospect, handleSign }: IStepView) => (
  <div
    data-testid="StepSignContract"
    className={`ni-step-sign ${props.className}`}
    style={props.style}
  >
    <div role="alert" className="alert toast is-error" data-testid="error">
      <AlertCircle />
      {prospect.error}
    </div>
    <Button
      className="is-pill u-margin-top-xl is-centered"
      data-testid="tryAgain"
      onClick={handleSign}
    >
      <ArrowRight />
      Sign Contract
    </Button>
  </div>
);

export default StepSignContractView;
