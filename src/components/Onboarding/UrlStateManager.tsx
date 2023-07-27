import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDocumentState, useConsents } from "../../store";
import { log } from "../../services";
import { UrlContext } from "../../store/UrlContext";
import Config from "../../services/Config";
// TOOD: - temp solution (commented steps)
const STEPS_PROTECTED_FOR_REFRESH = [
  // "back",
  "selfie",
  "personal-info",
  "choose-amount",
  "choose-products",
  "bsa-questionnaire",
  "invite-signers",
  // "front",
  // "capture-documents",
];

function UrlStateManager(): React.ReactElement {
  const history = useHistory();
  const { documents } = useDocumentState();
  const { currentStep } = useContext(UrlContext);
  const { consents } = useConsents();

  useEffect(() => {
    if (Config.env === "development" && Config.skipRoutes === true) {
      return;
    }

    // if at any step user would refresh the page
    // documents state would reset to initial state where consents.terms == false
    // In this case we redirect him to the start.
    // If the onboarding is for invitee then we restore name of person who invites him
    if (STEPS_PROTECTED_FOR_REFRESH.includes(currentStep) && !consents.terms) {
      log.error("We are missing data in state", "UrlStateManager");
      const startUrl = sessionStorage.getItem("startUrl");
      if (startUrl) {
        const savedName = sessionStorage.getItem("isInvitedByName");
        const savedToken = sessionStorage.getItem("inviteeToken");

        if (savedName && savedToken) {
          history.push(`${startUrl}?token=${savedToken}&name=${savedName}`);
        } else {
          history.push(startUrl);
        }
      }
    }
  }, [documents.front, currentStep, history, consents.terms]);
  return <div />;
}
export default UrlStateManager;
