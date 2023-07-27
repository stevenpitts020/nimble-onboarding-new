import React from "react";
import { AlertCircle, ArrowRight, Check } from "react-feather";
import image from "./send-email.svg";
import AlertMessage from "../../Common/AlertMessage/AlertMessage";
import { IStepView } from "./types";
import Button from "../../Common/Button/Button";

const StepVerifyEmailView = ({
  props,
  error,
  signerData,
  onResendClick,
  onFinishClick,
  status,
}: IStepView) => (
  <div
    data-testid="StepVerifyEmail"
    className={`ni-step-verify-email ${props.className}`}
    style={props.style}
  >
    <div className="flex-center-vertical">
      {error && (
        <div role="alert" className="alert toast is-error" data-testid="error">
          <AlertCircle /> Sorry, there was a problem sending the email. Please
          try again later.
        </div>
      )}
      <img
        src={image}
        alt="Send Email illustration"
        className="img-fluid mt-4 mb-12"
      />
      <h1 className="letter-spacing-tight mb-12">
        Don’t forget to verify your email
      </h1>

      <p className="text-center hint">
        To ensure that your email is correct we sent you a verification email to{" "}
        <b>{signerData.email}</b>. You can verify your email address now or do
        it later.
      </p>
      <p className="text-center hint">
        If you didn’t receive our email just click on the “Resend Email” button.
      </p>

      {status === "success" && (
        <AlertMessage
          title="New verification email sent"
          className="w100 text-center mt-6 mb-6"
        />
      )}

      <div className="flex-spaced-horizontal u-justify-center mt-6">
        <Button
          className="is-pill m-3"
          onClick={onResendClick}
          data-testid="resend-email"
        >
          <ArrowRight /> {status === "success" ? "Sent!" : "Resend Email"}
        </Button>
        <Button className="is-pill m-3 is-green" onClick={onFinishClick}>
          <Check /> Finish Request
        </Button>
      </div>
    </div>
  </div>
);

export default StepVerifyEmailView;
