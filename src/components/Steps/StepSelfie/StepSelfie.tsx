import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import animationData from "../../../animations/camera.json";
import defaultOptions from "../../../animations/options";
import { log } from "../../../services";
import { ProspectContext, InstitutionContext } from "../../../store";
import {
  uploadDocument,
  useDocumentState,
  useDocumentDispatch,
} from "../../../store/DocumentsContext";

import { LoadingContext } from "../../../store/LoadingContext";
import { IStepSelfie } from "./types";
import StepSelfieView from "./StepSelfieView";

const StepSelfie: React.FC<IStepSelfie> = () => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const institution = useContext(InstitutionContext);
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  // documents
  const { documents, status, error } = useDocumentState();
  const { front, back } = documents;
  const dispatch = useDocumentDispatch();

  const { populateProspectWithFields } = useContext(ProspectContext);

  const [photo, setPhoto] = useState("");
  const [cameraState, setCameraState] = React.useState("closed");

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const [allowFlip, setAllowFlip] = useState(false);

  const animationOptions = {
    ...defaultOptions,
    animationData,
  };

  useEffect(() => {
    const goToNextStep = () => {
      log.info("continue to next step", "cameraPhoto");
      dispatch({ type: "cancel" });
      history.push("/onboarding/personal-info");
      window.location.reload();
    };

    if (status === "success") {
      return goToNextStep();
    }

    if (status === "failure") {
      setCameraState("closed");
    }

    // check if more than 1 cam is present
    navigator.mediaDevices
      .enumerateDevices()
      .then((mediaDeviceInfos) => {
        const videoMediaDevices = mediaDeviceInfos.filter(
          (mdi) => mdi.kind === "videoinput"
        );
        if (videoMediaDevices.length > 1) {
          setAllowFlip(true);
        }
      })
      .catch((errorException) => {
        setAllowFlip(false);
        log.info("Error getting num of Cameras", errorException.message);
      });
  }, [status]);

  const handleTakePhoto = (photoDataUri: string) => {
    log.info("selfie done", "StepSelfie");
    setPhoto(photoDataUri);
    setCameraState("preview-active");
  };

  const handleContinueSelfie = async () => {
    setLoading(true);
    await uploadDocument(dispatch, photo, "selfie", institution!.id);
    log.info("Selfie sent", "StepSelfie");

    await populateProspectWithFields(front!.id, back !== null ? back.id : "");
    setLoading(false);
  };

  const handleRestartPhoto = () => {
    log.info("remove selfie", "StepSelfie");
    setPhoto("");
    setCameraState("camera-active");
  };

  const handleOpenCamera = () => {
    log.info("open camera", "StepSelfie");
    setCameraState("camera-active");
  };

  const handleFlipCamera = () => {
    if (facingMode === FACING_MODE_USER) {
      setFacingMode(FACING_MODE_ENVIRONMENT);
    } else {
      setFacingMode(FACING_MODE_USER);
    }
    log.info("flipping camera", facingMode);
  };

  return (
    <StepSelfieView
      error={error}
      animationOptions={animationOptions}
      photo={photo}
      handleTakePhoto={handleTakePhoto}
      handleRestartPhoto={handleRestartPhoto}
      handleContinueSelfie={handleContinueSelfie}
      handleFlipCamera={handleFlipCamera}
      allowFlip={allowFlip}
      handleOpenCamera={handleOpenCamera}
      cameraState={cameraState}
      facingMode={facingMode}
      status={status}
    />
  );
};
export default StepSelfie;
