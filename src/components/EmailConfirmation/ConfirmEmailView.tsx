import React from "react";
import { AlertCircle } from "react-feather";
import Loading from "../Common/Loading/Loading";
import iconEmailVerified from "./pc_checkmark_ok.svg";
import IconLinkExpired from "./pc_checkmark_warning.svg";
import { IConfirmEmailView } from "./types";

const ConfirmEmailView = ({
  statusPut,
  errorPut,
  handleResend,
  error,
  status,
  props,
}: IConfirmEmailView) => (
  <div
    className="mainContainer_wrapper"
    style={props.style}
    data-testid="confirm-email"
  >
    {statusPut === "loading" ? (
      <Loading fullPage={false} active />
    ) : (
      <div className="mainContainer">
        {statusPut === "success" ? (
          <div className="ni-step-confirm-email">
            <img src={iconEmailVerified} alt="email verified" />
            <h3>Thank you!</h3>
            <p>Your email account was successfully verified.</p>
          </div>
        ) : (
          <div className="ni-step-confirm-email">
            <img src={IconLinkExpired} alt="email confirmation link expired" />
            {errorPut === 409 ? (
              <h3>Your email confirmation link expired!</h3>
            ) : (
              <h3>Your email confirmation link didn&apos;t work!</h3>
            )}
            <p>
              Please click the resend button to receive a new verification email
            </p>
            {error && (
              <div
                role="alert"
                className="alert toast is-error"
                data-testid="error"
              >
                <AlertCircle /> Sorry, we couldn&apos;t send the email.
              </div>
            )}
            <button
              className="button is-pill is-green"
              onClick={handleResend}
              data-testid="resendButton"
            >
              {status === "success" ? "Sent!" : "Resend Verification Email"}
            </button>
          </div>
        )}
      </div>
    )}
  </div>
);

export default ConfirmEmailView;
