import React from "react";
import { AlertCircle } from "react-feather";
import {
  DRIVER_LICENSE,
  LEGAL_RESIDENCY_CARD,
  MAKE_SURE_DOCUMENT_READABLE,
  PASSPORT,
  STATE_ISSUED_ID,
  WHICH_DOCUMENT_TO_USE,
} from "../../../utils/constants/general";
import driverLicence from "./driver-licence.svg";
import legalResidencyCard from "./legal-residency-card.svg";
import passport from "./passport.svg";
import stateIssued from "./state-issued-id.svg";
import DocumentCards from "./DocumentCards";
import DocumentCapture from "../../DocumentCapture/DocumentCapture";
import { IStepCaptureDocumentsView } from "./types";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";

const StepCaptureDocumentsView: React.FC<IStepCaptureDocumentsView> = ({
  cameraState,
  handleResults,
  handleLoadFail,
  handleNoCameraError,
  handleRetryUpload,
  userSelectedDocumentType,
  handleDocumentTypeChange,
  error,
}) => (
  <Layout
    classNameContainer="flex flex-1 justify-center items-center"
    sidebarType={SIDEBAR_TYPE.NAVIGATION}
    hideNextButton
    showTimer={false}
  >
    <div
      data-testid="StepCaptureDocuments"
      className={`font-inter step-front camera-step text-center ${cameraState}`}
    >
      {cameraState === "camera-active" ? (
        <DocumentCapture
          visible
          onResults={handleResults}
          onLoadFail={handleLoadFail}
          onNoCameraError={handleNoCameraError}
          documentType={userSelectedDocumentType}
        />
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="text-dark text-2xl font-bold mb-2">
              {WHICH_DOCUMENT_TO_USE}
            </h1>
            <p className="text-gray font-normal">
              {MAKE_SURE_DOCUMENT_READABLE}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <DocumentCards
              title={DRIVER_LICENSE}
              icon={driverLicence}
              id={DRIVER_LICENSE}
              onClick={() => handleDocumentTypeChange(DRIVER_LICENSE)}
            />
            <DocumentCards
              title={STATE_ISSUED_ID}
              icon={stateIssued}
              id={STATE_ISSUED_ID}
              onClick={() => handleDocumentTypeChange(STATE_ISSUED_ID)}
            />
            <DocumentCards
              title={PASSPORT}
              icon={passport}
              onClick={() => handleDocumentTypeChange(PASSPORT)}
              id={PASSPORT}
            />
            <DocumentCards
              title={LEGAL_RESIDENCY_CARD}
              icon={legalResidencyCard}
              id={LEGAL_RESIDENCY_CARD}
              onClick={() => handleDocumentTypeChange(LEGAL_RESIDENCY_CARD)}
            />
          </div>
        </>
      )}
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
  </Layout>
);

export default StepCaptureDocumentsView;
