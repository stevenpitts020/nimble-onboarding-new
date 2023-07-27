import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProspectContext, useLoading } from "../../../store";
import SignerService from "../../../services/Signer";
import { UrlContext } from "../../../store/UrlContext";
import { log } from "../../../services";
import StepInstructions from "../StepInstructions/StepInstructions";
import { IParamsTypes, IStepInstructionsInvitees } from "./types";

const StepInstructionsInvitees: React.FC<IStepInstructionsInvitees> = () => {
  const history = useHistory();
  const { accountRequestId, signerId } = useParams<IParamsTypes>();

  const { prospect, addInvitee, updateSigner } = useContext(ProspectContext);
  const [error, setError] = React.useState("");

  const { setLoading } = useLoading();

  const { isInvitedByName, inviteeToken } = React.useContext(UrlContext);
  const getInvitedTitle = `${isInvitedByName} Invited you to open a Joint Account`;

  React.useEffect(() => {
    // check if token is broken
    const isTokenBroken = inviteeToken === null || inviteeToken === "";
    if (accountRequestId && signerId && isTokenBroken) {
      setError(
        "Some information about your application is missing. Please follow the link from the email again"
      );
      return;
    }

    // checks if this is a invitee
    if (accountRequestId && signerId && inviteeToken) {
      checkIfCompleted();
      addInvitee({ accountRequestId, signerId, inviteeToken });
    }
  }, [accountRequestId, signerId, inviteeToken, setError]);

  const checkIfCompleted = async () => {
    setLoading(true);

    const signerToken =
      (prospect.tokens || []).find((el) => el.id === signerId)?.token ||
      inviteeToken;
    if (signerToken == null) {
      return setLoading(false);
    }
    const signer = await SignerService.getSigner(signerToken, signerId);
    log.info("Got signer", "checkIfCompleted");
    setLoading(false);

    // check if the onboarding was already complete for this person
    if (signer.firstName) {
      log.info("Go to onboard already-complete", "checkIfCompleted");
      return history.push(
        `/onboarding/already-complete?name=${signer.firstName}`
      );
    }

    // pre-fill the email for the invitee in the form
    updateSigner({ ...prospect.signer, email: signer.email });
  };

  return <StepInstructions title={getInvitedTitle} error={error} />;
};
export default StepInstructionsInvitees;
