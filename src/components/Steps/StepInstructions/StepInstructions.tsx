import React from "react";
import { useHistory } from "react-router-dom";
import "./StepInstructions.sass";
import { ArrowRight, AlertCircle } from "react-feather";
import { InstitutionContext } from "../../../store/InstitutionContext";
import image from "./illustration.svg";
import {
  useConsents,
  useDocumentDispatch,
  ProspectContext,
} from "../../../store";
import { log } from "../../../services";
import { IStepInstructions } from "./types";

const defaultProps = {
  title: "Open your account in as little as 90 seconds",
};

const StepInstructions: React.FC<IStepInstructions> = (props) => {
  const history = useHistory();
  const institution = React.useContext(InstitutionContext);
  const { updateConsent } = useConsents();
  const dispatch = useDocumentDispatch();
  const { cleanSignerInformation } = React.useContext(ProspectContext);

  const onContinue = () => {
    log.info("Set initial consent", "StepInstructions");
    updateConsent("initial", true);

    log.info("Clean documents", "StepInstructions");
    dispatch({ type: "reset" });

    log.info("Clean signer", "checkIfCompleted");
    cleanSignerInformation();

    history.push("/onboarding/terms-and-conditions");
  };

  return (
    <div
      data-testid="StepInstructions"
      className={`ni-step-instructions ${props.className}`}
      style={props.style}
    >
      <div className="ni-step-instructions-illustration">
        <h1>
          <small>
            Welcome to
            {institution?.name}
          </small>
          <span data-testid="invited-by">{props.title}</span>
        </h1>
        <p>
          {institution?.name} uses NimbleFi as a third-party technology platform
          provider to help you open a new deposit account quickly and securely.
        </p>
        <img
          src={image}
          alt="Account Opening illustration"
          className="img-fluid"
        />
      </div>
      <div className="ni-step-instructions-content">
        {props.error && (
          <div className="w100">
            <div
              role="alert"
              className="alert toast is-error"
              data-testid="error"
            >
              <AlertCircle />
              {props.error}
            </div>
          </div>
        )}
        <p>The quickest way to open your new account.</p>
        <ol>
          <li>
            <span>
              <b>Authentication</b> <br />
              <small>
                Please have your driver&apos;s license readily available
              </small>
            </span>
          </li>
          <li>
            <span>
              <b>Personalization</b> <br />
              <small>
                Providing clarity and transparency when it comes to your
                individual financial needs
              </small>
            </span>
          </li>
          <li>
            <span>
              <b>Confirmation</b> <br />
              <small>
                E-sign and gain rapid-speed access to your product(s)
              </small>
            </span>
          </li>
        </ol>
        <span className="consent-text">
          By clicking “Let&apos;s Go” you acknowledge and agree that the
          information collected herein is being collected by and provided to{" "}
          {institution?.name} and, its agents, including SwitchTech, LLC d/b/a
          “NimbleFi” working as a third-party service provider. Notice of the
          bank’s privacy practices will also be provided to you, as required by
          applicable law.
        </span>

        <div className="ni-step-instructions-footer">
          <button
            onClick={onContinue}
            className="button is-pill is-green has-icon-after"
            data-testid="stepContinue"
          >
            Let&apos;s Go
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

StepInstructions.defaultProps = defaultProps;
export default StepInstructions;
