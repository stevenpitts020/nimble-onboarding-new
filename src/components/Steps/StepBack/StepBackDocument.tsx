import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import {
  uploadDocument,
  useDocumentState,
  useDocumentDispatch,
} from "../../../store/DocumentsContext";
import { LoadingContext } from "../../../store/LoadingContext";
import { InstitutionContext } from "../../../store/InstitutionContext";
import animationData from "../../../animations/camera.json";
import defaultOptions from "../../../animations/options";
import StepBackDocumentView from "./StepBackDocumentView";
import { IStepBackDocument } from "./types";

const StepBackDocument: React.FC<IStepBackDocument> = () => {
  const history = useHistory();

  const institution = useContext(InstitutionContext);
  const { setLoading } = useContext(LoadingContext);
  const { status, error } = useDocumentState();
  const dispatch = useDocumentDispatch();

  const [photo, setPhoto] = useState("");
  const [cameraState, setCameraState] = useState(
    photo ? "camera-active" : "closed"
  );

  const animationOptions = {
    ...defaultOptions,
    animationData,
  };

  React.useEffect(() => {
    const goToNextStep = () => {
      log.info("continue to next step", "cameraPhoto");
      dispatch({ type: "cancel" });
      history.push("/onboarding/selfie");
    };
    if (status === "success") {
      goToNextStep();
    }
    if (status === "failure") {
      setCameraState("closed");
    }
  }, [status, history, dispatch]);

  const handleTakePhoto = (photoDataUri: string) => {
    log.info("back done", "cameraPhoto");
    setPhoto(photoDataUri);
    setCameraState("preview-active");
  };

  const handleContinue = async () => {
    // post to server and save state
    setLoading(true);
    await uploadDocument(dispatch, photo, "back", institution!.id);
    setLoading(false);
  };

  const handleRestartPhoto = () => {
    log.info("remove back and open cam", "cameraPhoto");
    setPhoto("");
    setCameraState("camera-active");
  };

  return (
    <StepBackDocumentView
      error={error}
      animationOptions={animationOptions}
      cameraState={cameraState}
      handleContinue={handleContinue}
      handleRestartPhoto={handleRestartPhoto}
      handleTakePhoto={handleTakePhoto}
      photo={photo}
      status={status}
    />
  );
};
export default StepBackDocument;
