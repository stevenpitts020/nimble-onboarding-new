import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AlertCircle } from "react-feather";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import PhotoCapture from "../../PhotoCamera/PhotoCapture/PhotoCapture";
import TipItem from "./TipItem";
import { IStepFrontDocumentView } from "./types";
import { ReactComponent as Loading } from "./loading.svg";
import "./StepFrontDocument.sass";

const TIPS_LIST = [
  {
    number: 1,
    text: "Check if the corners of the ID are visible against the backdrop",
  },
  {
    number: 2,
    text: "Check if the all ID data is legible",
  },
  {
    number: 3,
    text: "Check if the ID is in color",
  },
];

const StepFrontDocumentView = ({
  cameraState,
  photoCaptureMsg,
  handleTakePhoto,
  error,
  documentType,
}: IStepFrontDocumentView) => {
  const [isCameraReady, setIsCameraReady] = useState(false);

  const {
    location: { pathname },
  } = useHistory();
  const isFront = pathname.replace("/onboarding/", "") === "front";
  const isBack = pathname.replace("/onboarding/", "") === "back";

  return (
    <Layout
      showTimer={false}
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      hideHeader
      hideBackButton={isBack}
      hideNextButton
      classNameContainer="w-full h-full flex flex-col items-center bg-zirkon camera-container"
    >
      {!isCameraReady && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading className="h-24 w-24 animate-spin" />
        </div>
      )}
      <div
        data-testid="step-front"
        className={`text-center ${cameraState} ${
          !isCameraReady && "opacity-0"
        }`}
      >
        <PhotoCapture
          facingMode="environment"
          title={photoCaptureMsg}
          onTakePhoto={handleTakePhoto}
          setIsCameraReady={setIsCameraReady}
          header={`Please scan the ${
            isFront ? "FRONT" : "BACK"
          } of your ${documentType.replace(/%20/g, " ")} or take a photo`}
        />

        {error && (
          <div role="alert" className="alert toast is-error u-margin-top-xl">
            <AlertCircle /> {error}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 flex justify-between w-full h-12 px-[120px]">
        {TIPS_LIST.map(({ number, text }) => (
          <TipItem key={number} number={number} text={text} />
        ))}
      </div>
    </Layout>
  );
};

export default StepFrontDocumentView;
