import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import animationData from "../../../animations/camera.json";
import defaultOptions from "../../../animations/options";
import {
  uploadDocument,
  useDocumentState,
  useDocumentDispatch,
} from "../../../store/DocumentsContext";
import { LoadingContext } from "../../../store/LoadingContext";
import { InstitutionContext } from "../../../store";
import StepFrontDocumentView from "./StepFrontDocumentView";
import { IStepFrontDocument } from "./types";

const StepFrontDocument: React.FC<IStepFrontDocument> = () => {
  const history = useHistory();
  const institution = useContext(InstitutionContext);
  const { status, error } = useDocumentState();
  const dispatch = useDocumentDispatch();
  const paramsArray = history.location.search.split("&");
  const [photo, setPhoto] = useState("");
  const [cameraState, setCameraState] = useState(
    photo ? "camera-active" : "closed"
  );
  const { setLoading } = useContext(LoadingContext);

  const [photoCaptureMsg, setphotoCaptureMsg] = useState(
    "Make sure that the front of your document is visible and readable."
  );

  const animationOptions = {
    ...defaultOptions,
    animationData,
  };

  React.useEffect(() => {
    if (paramsArray[0] === "?camera-active") {
      log.info("Using fallback", "open camera");
      setphotoCaptureMsg(
        `
        We couldn't automatically scan your ID.
        Please present the front of your document again and click the button below when ready.
        `
      );
      setCameraState("camera-active");
    }

    const goToNextStep = () => {
      log.info("continue to next step", "cameraPhoto");
      dispatch({ type: "cancel" });
      if (paramsArray[1] === "PASSPORT") {
        history.push("/onboarding/selfie");
      } else {
        history.push("/onboarding/back");
      }
    };
    if (status === "success") {
      goToNextStep();
    }
    if (status === "failure") {
      setCameraState("closed");
    }
  }, [status]);

  const handleTakePhoto = (photoDataUri: string) => {
    log.info("front done", "cameraPhoto");
    setPhoto(photoDataUri);
    setCameraState("preview-active");
  };

  const handleContinue = async () => {
    // post to server and save state
    setLoading(true);
    await uploadDocument(dispatch, photo, "front", institution!.id);
    setLoading(false);
  };

  const handleRestartPhoto = () => {
    log.info("remove front", "cameraPhoto");
    setPhoto("");
    setCameraState("camera-active");
  };

  return (
    <StepFrontDocumentView
      photo={photo}
      handleTakePhoto={handleTakePhoto}
      handleRestartPhoto={handleRestartPhoto}
      handleContinue={handleContinue}
      cameraState={cameraState}
      animationOptions={animationOptions}
      error={error}
      photoCaptureMsg={photoCaptureMsg}
      status={status}
    />
  );
};
export default StepFrontDocument;
