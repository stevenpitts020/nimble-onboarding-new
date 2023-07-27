import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { ProspectContext, useLoading, useBsa } from "../../../store";
import { log, signer as SignerService } from "../../../services";
import StepSignContractView from "./StepSignContractView";
import { IStep } from "./types";

const StepSignContract: FC<IStep> = (props) => {
  const history = useHistory();
  const { setLoading } = useLoading();
  const { prospect, finishProspect, setError } =
    React.useContext(ProspectContext);
  const { resetBsa } = useBsa();
  const urlQuery = history.location.search;

  const goToEmbedDocument = async () => {
    log.info("get a embed view", "getEmbed");

    try {
      const url = `/signers/${prospect.signerId!}/contract`;
      const token =
        (prospect.tokens || []).find((el) => el.id === prospect.signerId)
          ?.token! || prospect.securityToken;
      if (url && token) {
        const result = await SignerService.getEmbedSignView(url, token);
        // redirect to this URL
        log.info(result.url, "getEmbed");
        setTimeout(() => window.location.assign(result.url), 900);
      } else {
        log.info("No URL OR Token", "getEmbed");
        history.push("/onboarding");
        // fix no clear loading in onboarding route
        setLoading(false);
      }
    } catch (err) {
      log.info(`failed to generate url ${err}`, "getEmbed");
      setError(
        "There was a problem fetching the contract to sign. Please contact support."
      );
      setLoading(false);
    }
  };

  const goToNextStep = () => {
    history.push("/onboarding/verify-email");
  };

  React.useEffect(() => {
    setLoading(true);

    log.info("Opening Page", "StepSignContract");

    if (prospect.status === "success") {
      log.info("Redirect to next step", "StepSignContract");
      goToNextStep();
    } else if (urlQuery === "?event=signing_complete") {
      log.info("Document is signed", "StepSignContract");
      sessionStorage.removeItem("BSA");
      sessionStorage.removeItem("PRODUCT_OPTIONS");
      resetBsa();
      finishProspect();
    } else if (prospect.status === "embedReady" && urlQuery === "") {
      log.info("embedReady", "StepSignContract");
      goToEmbedDocument();
    } else if (urlQuery === "" || urlQuery === null) {
      log.info("No url query", "StepSignContract");
      setError("You need to sign the contract to finish your account opening");
      setLoading(false);
    } else {
      log.info(`Document was not signed ${urlQuery}`, "handleEvent");
      setError(SignerService.parseDocusignEventQuery(urlQuery));
      setLoading(false);
    }
  }, [history, prospect.status, setError, setLoading]);

  const handleSign = () => {
    setLoading(true);
    goToEmbedDocument();
  };

  return (
    <StepSignContractView
      props={props}
      prospect={prospect}
      handleSign={handleSign}
    />
  );
};
export default StepSignContract;
