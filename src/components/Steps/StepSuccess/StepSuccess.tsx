import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./StepSuccess.sass";
import { AlertCircle, ArrowRight } from "react-feather";
import {
  ProspectContext,
  useDocumentState,
  InstitutionContext,
  useLoading,
  useConsents,
  useBsa,
} from "../../../store";
import { log, signer as SignerService } from "../../../services";
import { IStepSuccess } from "./types";
import StepSuccessView from "./StepSuccessView";
import Button from "../../Common/Button/Button";

const StepSuccess: React.FC<IStepSuccess> = (props) => {
  const history = useHistory();
  const { setLoading } = useLoading();
  const { prospect, sendDataToServer, resetProspect } =
    useContext(ProspectContext);
  const { documents } = useDocumentState();
  const { consents } = useConsents();
  const { bsa } = useBsa();
  const institution = useContext(InstitutionContext);

  // creates an account request in the server and changes the prospect.status property
  const sendData = async () => {
    await sendDataToServer(institution!.id, documents, consents, bsa.results);
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);

    switch (prospect.status) {
      case "failure":
        setLoading(false);
        // if the error was not 500 then we can redirect to the form probably
        log.info(prospect.error, "StepSuccess");

        if (prospect.error === SignerService.NETWORK_ERROR_MSG_SIGNER) {
          log.info("a network error while creating prospect", "StepSuccess");
        } else if (prospect.error !== SignerService.SERVER_ERROR_MSG_SIGNER) {
          log.info("a error occured while creating prospect", "StepSuccess");
          history.push("/onboarding/personal-info");
        }
        break;
      case "signerReady":
        log.info("signer is ready", "StepSuccess");
        sendData();
        break;
      case "embedReady":
        log.info("embed is ready", "StepSuccess");
        history.push("/onboarding/sign-contract");
        break;
      case "success":
        log.info("status is success", "StepSuccess");
        if (sessionStorage.getItem("invitees") !== null) {
          if (JSON.parse(sessionStorage.getItem("invitees")!).length >= 1) {
            history.push("/onboarding/other-applicants");
            return;
          }
        }
        setLoading(false);
        break;
      default:
        log.info("status is idle", "StepSuccess");
        setLoading(false);
        break;
    }
  }, [history, prospect.error, prospect.status, setLoading]);

  const handleRestart = () => {
    sessionStorage.clear();
    log.info("Restart Process", "StepSuccess");
    resetProspect();
    history.push("/onboarding");
  };

  const handleRepeatRequest = () => {
    setLoading(true);
    sendData();
  };

  if (prospect.status === "failure") {
    return (
      <div
        data-testid="StepSuccess"
        className={`ni-step-success ${props.className}`}
        style={props.style}
      >
        <div role="alert" className="alert toast is-error" data-testid="error">
          <AlertCircle />
          There was a problem while processing your account and it&apos;s not
          possible to continue. We&apos;ve notified our engineers of the
          problem. In the meantime you can go back to the form and try again.
        </div>
        <Button
          className="is-pill u-margin-top-xl is-centered"
          data-testid="tryAgainButton"
          onClick={handleRepeatRequest}
        >
          <ArrowRight />
          Try again
        </Button>
      </div>
    );
  }

  return (
    <StepSuccessView
      props={props}
      handleRestart={handleRestart}
      institution={institution}
    />
  );
};
export default StepSuccess;
