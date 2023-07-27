import React from "react";
import { Lottie } from "@alfonmga/react-lottie-light-ts";
import { animationOptions, IStepSuccessView } from "./types";
import ButtonList from "../../ButtonList/ButtonList";

const StepSuccessView = ({
  props,
  institution,
  handleRestart,
}: IStepSuccessView) => (
  <div
    data-testid="StepSuccess"
    className={`ni-step-success ${props.className}`}
    style={props.style}
  >
    <Lottie
      config={animationOptions}
      height="200px"
      width="200px"
      style={{ margin: "0 auto" }}
    />
    <h3>
      {`Thank you for choosing ${
        institution ? institution.name : "Central Bank"
      }`}
    </h3>
    <h2>Your request has been sent!</h2>
    <p>Our team is reviewing your request and will contact you shortly..</p>
    <ButtonList
      handleRestart={handleRestart}
      institution={institution?.domain}
    />
  </div>
);

export default StepSuccessView;
