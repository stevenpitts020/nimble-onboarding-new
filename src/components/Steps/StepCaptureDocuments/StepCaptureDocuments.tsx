import React, { useState, useContext, FC } from "react";
import { useHistory } from "react-router-dom";
import { AlertCircle, ArrowRight } from "react-feather";
import { log } from "../../../services";
import DocumentCapture from "../../DocumentCapture/DocumentCapture";
import FormatHelper from "../../../utils/FormatHelper";
import {
  uploadDocument,
  useDocumentState,
  useDocumentDispatch,
} from "../../../store/DocumentsContext";
import { ProspectContext } from "../../../store";
import { LoadingContext } from "../../../store/LoadingContext";
import { InstitutionContext } from "../../../store/InstitutionContext";
import ImageToBase64 from "../../../utils/ImageToBase64";
import DetectOS from "../../../utils/DetectOS";
import Config from "../../../services/Config";
import NoCameraMessage from "../../PhotoCamera/NoCameraMessage/NoCameraMessage";
import "./StepCaptureDocuments.sass";
import IconDriversLicence from "./iconDriversLicence.svg";
import IconPassport from "./iconPassport.svg";
import { ISignerDetails } from "../../../store/reducers/type";
import { IStepCaptureDocuments } from "./types";

const StepCaptureDocuments: FC<IStepCaptureDocuments> = () => {
  window.scrollTo(0, 0);
  const history = useHistory();
  const { prospect, updateSigner } = useContext(ProspectContext);
  const institution = useContext(InstitutionContext);
  const [userSelectedDocumentType, setUserSelectedDocumentType] =
    React.useState("");
  const { status, error, documents } = useDocumentState();
  const dispatch = useDocumentDispatch();
  const browser = DetectOS.getBrowser();
  const shouldLoadSdk =
    !(browser.name === "Safari" && parseInt(browser.version, 10) <= 13) &&
    DetectOS.isWebAssemblySupported();
  const [frontDoc] = useState("");
  const [cameraState, setCameraState] = useState(
    frontDoc ? "camera-active" : "closed"
  );
  const { setLoading } = useContext(LoadingContext);
  const [message, setMessage] = React.useState("");
  // for retry purposes
  const [tempFrontDoc, setTempFrontDoc] = React.useState("");
  const [tempBackDoc, setTempBackDoc] = React.useState("");
  React.useEffect(() => {
    const goToNextStep = () => {
      log.info("continue to next step", "cameraPhoto");
      dispatch({ type: "cancel" });
      if (userSelectedDocumentType === "PASSPORT") {
        history.push("/onboarding/selfie");
      } else {
        if (documents.back) {
          history.push("/onboarding/selfie");
        } else {
          history.push("/onboarding/back");
        }
      }
    };
    if (
      Config.mockPhotos ||
      (userSelectedDocumentType !== "" && !shouldLoadSdk)
    ) {
      handleLoadFail(null);
    }
    if (status === "success") {
      goToNextStep();
    }
    if (status === "failure") {
      setCameraState("closed");
    }
  }, [status, shouldLoadSdk]);
  const handleResults = (result: any) => {
    log.info("capture done", "handleResults");
    let backDocUrl: string;

    setUserSelectedDocumentType(result.documentType);

    const frontDocUrl =
      typeof result.fullDocumentFrontImage === "string"
        ? result.fullDocumentFrontImage
        : ImageToBase64(result.fullDocumentFrontImage.rawImage);
    setTempFrontDoc(frontDocUrl);
    if (result.documentType === "USDL") {
      backDocUrl =
        typeof result.fullDocumentBackImage === "string"
          ? result.fullDocumentBackImage
          : ImageToBase64(result.fullDocumentBackImage.rawImage);
      setTempBackDoc(backDocUrl);
    } else {
      backDocUrl = "";
    }
    handleContinue(result, frontDocUrl, backDocUrl);
  };

  const handleContinue = async (
    result: ISignerDetails,
    frontDocUrl: string,
    backDocUrl?: string
  ) => {
    // post to server and save state
    setLoading(true);

    const { address, city, state, zipCode } =
      FormatHelper.parseFullAddress(result);
    if (
      result.address ||
      result.firstName ||
      result.lastName ||
      result.dateOfBirth ||
      result.documentIssuedDate
    ) {
      await updateSigner({
        ...prospect.signer,
        firstName: FormatHelper.capitalize(
          FormatHelper.parseFirstAndMiddleName({
            firstName: result.firstName,
            middleName: "",
          }).firstName
        ),
        middleName: FormatHelper.capitalize(
          FormatHelper.parseFirstAndMiddleName({
            firstName: result.firstName,
            middleName: "",
          }).middleName
        ),
        lastName: result.lastName
          ? FormatHelper.capitalize(result.lastName)
          : "",
        dateOfBirth: result.dateOfBirth || "1900-01-01",
        documentType: result.documentType,
        documentExpirationDate: result.documentExpirationDate || "1900-01-01",
        documentIssuedDate: result.documentIssuedDate || "1900-01-01",
        address,
        city: city ? FormatHelper.capitalize(city) : "",
        state,
        // removes last 4 digits that the barcode scan is returning
        zipCode: zipCode.length > 5 ? zipCode.slice(0, 5) : zipCode,
        documentNumber: result.documentNumber,
        documentIssuer: result.documentIssuer || state,
      });
    }
    if (frontDocUrl) {
      await uploadDocument(dispatch, frontDocUrl, "front", institution!.id);
      log.info("upload front", "handleContinue");
    }
    if (backDocUrl) {
      await uploadDocument(dispatch, backDocUrl, "back", institution!.id);
      log.info("upload back", "handleContinue");
    }
    setLoading(false);
  };

  const handleLoadFail = async (someError: any) => {
    log.info("Falling Back", "StepCaptureDocument");
    log.info(someError, "StepCaptureDocument");

    // avoid documentType null
    await updateSigner({
      ...prospect.signer,
      documentType:
        userSelectedDocumentType === "" ? "USDL" : userSelectedDocumentType,
    });

    // check if there was an error or the os/browser is not supported
    if (someError) {
      history.push(
        `/onboarding/front?camera-active&${userSelectedDocumentType}`
      );
    } else {
      history.push("/onboarding/front");
    }
  };

  const handleOpenCamera = () => {
    log.info("Open Camera", "StepCaptureDocument");
    setCameraState("camera-active");
  };

  const handleRetryUpload = async () => {
    await uploadDocument(dispatch, tempFrontDoc, "front", institution!.id);
    if (userSelectedDocumentType === "USDL") {
      await uploadDocument(dispatch, tempBackDoc, "back", institution!.id);
    }
    log.info(`retry upload ${status}`, "documentUpload");
  };

  const handleNoCameraError = () => {
    const msg = "We didn't find a camera on this device";
    log.warn("camera not working", "cameraPhoto");
    document.body.style.overflow = "auto";
    setMessage(msg);
  };

  const handleDocumentTypeChange = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setUserSelectedDocumentType(event.currentTarget.id);
    log.info(
      "StepCaptureDocuments",
      `set document type to ${event.currentTarget.id}`
    );
  };

  // if there is an error, show no camera message
  if (message) {
    return (
      <NoCameraMessage title={message}>
        <p>
          Make sure you clicked <b>Allow</b> on the tooltip prompted by your
          browser.
        </p>
        <p>
          If you don&apos;t have a camera on this device scan this QR code with
          your smartphone or tablet to complete the process.
        </p>
      </NoCameraMessage>
    );
  }
  return (
    <div
      data-testid="StepCaptureDocuments"
      className={`step-front camera-step text-center ${cameraState}`}
    >
      {cameraState === "camera-active" && (
        <DocumentCapture
          visible
          onResults={handleResults}
          onLoadFail={handleLoadFail}
          onNoCameraError={handleNoCameraError}
          documentType={userSelectedDocumentType}
        />
      )}
      <div className="intro-text">
        <h3>We need to verify your identity</h3>
        <h2>Which document do you wish to use?</h2>
        <h4>
          Make sure that your document is readable and is not physically damaged
          or expired.
        </h4>
        <div className="doc-type-list">
          <button
            id="USDL"
            onClick={handleDocumentTypeChange}
            className={`button has-icon-before ${
              userSelectedDocumentType === "USDL" ? "selected" : ""
            }`}
          >
            <img src={IconDriversLicence} alt="icon driver's license" />
            Driver&apos;s License
          </button>
          <button
            id="PASSPORT"
            onClick={handleDocumentTypeChange}
            className={`button has-icon-before ${
              userSelectedDocumentType === "PASSPORT" ? "selected" : ""
            }`}
          >
            <img src={IconPassport} alt="icon driver's passport" />
            Passport
          </button>
        </div>

        {!error && (
          <button
            onClick={handleOpenCamera}
            className="button is-pill is-green has-icon-after"
            disabled={userSelectedDocumentType === ""}
          >
            Scan Document
            <ArrowRight />
          </button>
        )}
      </div>
      {error && (
        <div role="alert" className="alert toast is-error u-margin-top-xl">
          <AlertCircle /> {error}
          <button
            className="button is-pill is-red has-icon-after"
            onClick={handleRetryUpload}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};
export default StepCaptureDocuments;
