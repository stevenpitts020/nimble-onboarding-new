import React from "react";
import AlertMessage from "../../Common/AlertMessage/AlertMessage";
import { IStepInvitesView } from "./types";
import InvitesForm from "../../Forms/InvitesForm/InvitesForm";

const StepInvitesView = ({
  props,
  showMessage,
  selectedProductName,
  onChangePrimaryRole,
  onSubmitForm,
  handleSkip,
  handleBack,
  invitees,
  prospect,
}: IStepInvitesView) => (
  <div
    data-testid="StepInvites"
    className="ni-step-signers"
    style={props.style}
  >
    {showMessage && (
      <AlertMessage title="You are changing the account ownership">
        By changing a signer to primary, you will automatically become a
        secondary account holder of this account. Are you sure?
      </AlertMessage>
    )}
    <h1>
      Do you wish to apply for a{selectedProductName} account with a
      co-applicant?
    </h1>
    <p className="hint">
      Just type the email of the person you wish to invite.
      <br />
      If you don’t wish to invite others simply click{" "}
      <strong>Sign and Finish</strong>.
    </p>
    <InvitesForm
      onChangePrimaryRole={onChangePrimaryRole}
      onSubmit={onSubmitForm}
      onSkip={handleSkip}
      onBack={handleBack}
      defaultInvites={invitees}
      loading={false}
      maxInvitees={props.maxInvitees}
      disallowedEmails={
        prospect?.signer?.email ? [prospect.signer.email] : undefined
      }
    />
  </div>
);

export default StepInvitesView;
