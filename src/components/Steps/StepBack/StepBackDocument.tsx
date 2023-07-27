import React, { useEffect, useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import {
  uploadDocument,
  useDocumentState,
  useDocumentDispatch,
} from "../../../store/DocumentsContext";
import { LoadingContext } from "../../../store/LoadingContext";
import { InstitutionContext } from "../../../store/InstitutionContext";
import StepBackDocumentView from "./StepBackDocumentView";
import { useLayout } from "../../../store/LayoutContext";
import { IStepBackDocument } from "./types";

const StepBackDocument: React.FC<IStepBackDocument> = () => {
  const history = useHistory();

  const institution = useContext(InstitutionContext);
  const { setLoading } = useContext(LoadingContext);
  const { status, error } = useDocumentState();
  const dispatch = useDocumentDispatch();

  const paramsArray = history.location.search.split("&");

  const [photo, setPhoto] = useState("");
  const [cameraState, setCameraState] = useState(
    photo ? "camera-active" : "closed"
  );

  useEffect(() => {
    if (paramsArray[0] === "?camera-active") {
      log.info("Using fallback", "open camera");
      setCameraState("camera-active");
    }
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
  }, [status]);

  const handleTakePhoto = (photoDataUri: string) => {
    log.info("back done", "cameraPhoto");
    setPhoto(photoDataUri);
    setCameraState("preview-active");
    dispatch({ type: "resolve" });
  };

  const handleContinue = useCallback(async () => {
    // post to server and save state
    setLoading(true);
    await uploadDocument(dispatch, photo, "back", institution!.id);
    setLoading(false);
  }, [photo, dispatch, institution]);

  const handleRestartPhoto = useCallback(() => {
    log.info("remove back and open cam", "cameraPhoto");
    setPhoto("");
    setCameraState("camera-active");
  }, []);

  const goToBack = useCallback(() => {
    if (photo) {
      handleRestartPhoto();
    } else {
      history.goBack();
    }
  }, [photo, history, handleRestartPhoto]);

  useLayout({ showNextButton: !!photo, goToNext: handleContinue, goToBack });

  return (
    <StepBackDocumentView
      error={error}
      cameraState={cameraState}
      handleTakePhoto={handleTakePhoto}
      photo={photo}
      documentType={paramsArray[1]}
    />
  );
};
export default StepBackDocument;
