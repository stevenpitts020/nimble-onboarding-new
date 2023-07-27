import React from "react";
import { ArrowRight } from "react-feather";
import TermsAndConditions from "../../Legal/TermsAndConditions/TermsAndConditions";
import Checkbox from "../../Forms/Checkbox/Checkbox";
import { IStepTermsAndConditionsView } from "./types";
import Button from "../../Common/Button/Button";
import AlertDialogModal from "../../Common/AlertDialogModal/AlertDialogModal";

const StepTermsAndConditionsView = ({
  props,
  isChecked,
  onCheck,
  onButtonClick,
  isOpen,
  onAction,
}: IStepTermsAndConditionsView) => (
  <div
    data-testid="StepTermsAndConditions"
    className={`ni-step-terms-and-conditions ${props.className}`}
    style={props.style}
  >
    <div className="terms-content">
      <div className="info">
        <h1>
          <small>Before you start...</small>
          Important information about your account opening
        </h1>
        <p>
          On September 11, 2001, our lives changed forever. In an effort to
          protect you and our country, the USA PATRIOT Act was signed into law.
          To help the government fight the funding of terrorism and money
          laundering activities, Federal law requires all financial institutions
          to obtain, verify and record information that identifies each person
          who opens an account.
        </p>
        <p>
          When you open an account, we will ask for your name, address, date of
          birth and other information that will allow us to identify you. We may
          ask to see your driver’s license or other identifying documents.
        </p>
        <p>
          Please read and acknowledge to our terms of use by clicking the
          checkbox below to continue with your account opening.
        </p>
      </div>
      <div className="content">
        <TermsAndConditions />
      </div>
    </div>
    <div className="terms-footer">
      <div className="checkbox-with-text">
        <Checkbox
          checked={isChecked}
          onChange={onCheck}
          name="termsAccept"
          id="termscheckbox"
        />
        <p>
          <label htmlFor="termscheckbox">
            I acknowledge and agree with NimbleFi Terms of Use.
          </label>
        </p>
      </div>

      <div className="text-center">
        <Button
          disabled={!isChecked}
          className="button is-pill is-green has-icon-after"
          data-testid="step-terms-and-conditions-continue"
          onClick={onButtonClick}
        >
          Let&apos;s dive right in
          <ArrowRight />
        </Button>
      </div>
    </div>
    <AlertDialogModal
      isOpen={isOpen}
      onAction={onAction}
      title="You did not check the consent box."
    />
  </div>
);

export default StepTermsAndConditionsView;
