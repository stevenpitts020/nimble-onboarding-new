import React, { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "../../../store/LoadingContext";
import { log } from "../../../services";
import "./StepOnboardOthers.sass";
import SignerService from "../../../services/Signer";
import { InstitutionContext, ProspectContext } from "../../../store";
import StepOnboardOthersView from "./StepOnboardOthersView";
import { IInviteesList, IStepOnboardOthers } from "./types";

const StepOnboardOthers: FC<IStepOnboardOthers> = (props) => {
  const institution = useContext(InstitutionContext);
  const { prospect } = useContext(ProspectContext);
  const history = useHistory();
  const parsedSigner = prospect.invitedBy;
  const institutionDomain = institution
    ? institution.domain
    : window.location.pathname.split("/")[1];
  const token = prospect.securityToken;
  const accountRequestId = prospect.accountRequestId;

  const { loading, setLoading } = useContext(LoadingContext);
  const [inviteesList, setinviteesList] = useState<IInviteesList[]>([]);

  const getAllSigners = async () => {
    try {
      const inviteesStrings = sessionStorage.getItem("invitees");
      const parsedInvitees =
        inviteesStrings !== null ? JSON.parse(inviteesStrings) : [];

      log.info("fetching signers status", "getAllSigners");

      const inviteeSigners = await Promise.all(
        parsedInvitees.map(async (invitee: IInviteesList) => {
          const signerToken =
            (prospect.tokens || []).find((el) => el.id === invitee.id)?.token ||
            "";
          const signer = await SignerService.getSigner(signerToken, invitee.id);

          return {
            id: signer.id,
            name: signer.firstName,
            email: signer.email,
            signed: signer.firstName !== null,
          };
        })
      );
      setinviteesList(inviteeSigners);
      log.info("got list of signers", "getAllSigners");

      return inviteeSigners;
    } catch (error) {
      log.error(error, "getAllSigners");
      return [];
    }
  };

  React.useEffect(() => {
    const runAsyncFunctions = async () => {
      setLoading(true);

      const inviteeSigners = await getAllSigners();
      const shouldSkip =
        !Object.values(inviteeSigners).some((x) => x.signed !== true) ||
        parsedSigner === undefined;
      if (shouldSkip) {
        log.info("Skipping onboard step", "StepOnboardOther");
        goToSuccess();
        return;
      }
      setLoading(false);
    };
    runAsyncFunctions();

    return () => setLoading(false);
  }, []);

  const handleStartOnboading = (event: React.MouseEvent<HTMLElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    const baseURL =
      "/onboarding/:account_request_id/signers/:signer_id?name=:invitedBy&token=:token";
    const inviteLink = baseURL
      .replace(":account_request_id", accountRequestId!)
      .replace(":signer_id", id!)
      .replace(":invitedBy", parsedSigner ? parsedSigner.firstName : "Someone")
      .replace(":domain", institutionDomain)
      .replace(":token", token!);

    log.info(inviteLink, "handleStartOnboading");
    history.push(inviteLink);
  };

  const goToSuccess = () => {
    sessionStorage.clear();
    history.push("/onboarding/success");
  };

  if (loading) {
    return null;
  }
  return (
    <StepOnboardOthersView
      props={props}
      goToSuccess={goToSuccess}
      handleStartOnboading={handleStartOnboading}
      inviteesList={inviteesList}
      parsedSigner={parsedSigner}
    />
  );
};
export default StepOnboardOthers;
