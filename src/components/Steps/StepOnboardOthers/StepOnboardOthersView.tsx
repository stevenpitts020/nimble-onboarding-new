import React from "react";
import { IStepOnboardOthersView } from "./types";
import Button from "../../Common/Button/Button";

const StepOnboardOthersView = ({
  props,
  inviteesList,
  parsedSigner,
  handleStartOnboading,
  goToSuccess,
}: IStepOnboardOthersView) => (
  <div
    data-testid="StepOnboardOthers"
    className={`ni-step-onboard-others ${props.className}`}
    style={props.style}
  >
    <h3 data-testid="StepOnboardOthersTitle">
      Do you wish to onboard other applicants right now or later?
    </h3>
    <p>
      You can choose to onboard other co-applicants right now or invite them to
      join later{" "}
    </p>
    <ul className="applicants" data-testid="applicantsList">
      {inviteesList.map((signerInvitee: any) => (
        <li
          key={signerInvitee.id}
          className={signerInvitee.signed ? "signed" : "not-signed"}
          data-testid={
            parsedSigner!.email === signerInvitee.email
              ? "currentSigner"
              : "applicant-item"
          }
        >
          <p>
            {signerInvitee.signed ? signerInvitee.name : signerInvitee.email}
          </p>
          {signerInvitee.signed ? (
            <span>{signerInvitee.signed && "Complete"}</span>
          ) : (
            <Button
              className="is-pill"
              data-id={signerInvitee.id}
              onClick={handleStartOnboading}
            >
              Start Now
            </Button>
          )}
        </li>
      ))}
    </ul>
    <div className="controls">
      <Button
        className="is-pill is-green"
        onClick={goToSuccess}
        data-testid="go-to-success"
      >
        Send invite to pending co-applicants
      </Button>
    </div>
  </div>
);

export default StepOnboardOthersView;
