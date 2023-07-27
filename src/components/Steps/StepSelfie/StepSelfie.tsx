import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import { useLayout } from "../../../store/LayoutContext";

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
  const [cameraState, setCameraState] = React.useState("camera-active");

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const [allowFlip, setAllowFlip] = useState(false);

  useEffect(() => {
    const goToNextStep = () => {
      log.info("continue to next step", "cameraPhoto");
      dispatch({ type: "cancel" });
      history.push("/onboarding/my-personal-income");
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
    dispatch({ type: "resolve" });
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

  const handleFlipCamera = () => {
    if (facingMode === FACING_MODE_USER) {
      setFacingMode(FACING_MODE_ENVIRONMENT);
    } else {
      setFacingMode(FACING_MODE_USER);
    }
    log.info("flipping camera", facingMode);
  };

  const goToBack = useCallback(() => {
    if (photo) {
      handleRestartPhoto();
    } else {
      history.goBack();
    }
  }, [photo, history, handleRestartPhoto]);

  useLayout({
    showNextButton: !!photo,
    goToNext: handleContinueSelfie,
    goToBack,
  });

  return (
    <StepSelfieView
      error={error}
      photo={photo}
      handleTakePhoto={handleTakePhoto}
      handleFlipCamera={handleFlipCamera}
      allowFlip={allowFlip}
      cameraState={cameraState}
      facingMode={facingMode}
    />
  );
};
export default StepSelfie;
