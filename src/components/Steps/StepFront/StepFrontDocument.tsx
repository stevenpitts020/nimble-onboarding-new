import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import {
  uploadDocument,
  useDocumentState,
  useDocumentDispatch,
} from "../../../store/DocumentsContext";
import { LoadingContext } from "../../../store/LoadingContext";
import { InstitutionContext } from "../../../store";
import StepFrontDocumentView from "./StepFrontDocumentView";
import { IStepFrontDocument } from "./types";
import { useLayout } from "../../../store/LayoutContext";
import { LOCALE_STORAGE_KEY_FRONT_PHOTO } from "../../../utils/constants/general";

const StepFrontDocument: React.FC<IStepFrontDocument> = () => {
  const history = useHistory();
  const institution = useContext(InstitutionContext);
  const { status, error } = useDocumentState();
  const dispatch = useDocumentDispatch();

  const isBack = useMemo(
    () => history.location.pathname.includes("back"),
    [history.location.pathname]
  );

  const paramsArray = useMemo(
    () => history.location.search.split("&"),
    [history.location]
  );

  const [photo, setPhoto] = useState("");
  const [cameraState, setCameraState] = useState(
    photo ? "camera-active" : "closed"
  );
  const { setLoading } = useContext(LoadingContext);

  const [photoCaptureMsg, setphotoCaptureMsg] = useState(
    "Make sure that the front of your document is visible and readable."
  );

  useEffect(() => {
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
        history.push("/onboarding/selfie?camera-active");
      } else {
        history.push(`/onboarding/back?camera-active&${paramsArray[1]}`);
      }
    };
    if (status === "success") {
      goToNextStep();
    }
    if (status === "failure") {
      setCameraState("closed");
    }
  }, [status]);

  const handleTakeFrontPhoto = useCallback((photoDataUri: string) => {
    log.info("front done", "cameraPhoto");
    setPhoto(photoDataUri);
    setCameraState("preview-active");

    sessionStorage.setItem(LOCALE_STORAGE_KEY_FRONT_PHOTO, photoDataUri);

    dispatch({ type: "resolve" });

    handleContinue(photoDataUri);
  }, []);

  const handleTakeBackPhoto = useCallback(
    (photoDataUri: string) => {
      log.info("back done", "cameraPhoto");
      setPhoto(photoDataUri);
      setCameraState("preview-active");

      dispatch({ type: "resolve" });

      handleContinue(photoDataUri);
    },
    [photo, dispatch, institution, isBack]
  );

  const handleContinue = useCallback(
    async (photoDataUri) => {
      // post to server and save state
      setLoading(true);

      await uploadDocument(
        dispatch,
        photoDataUri,
        isBack ? "back" : "front",
        institution!.id
      );
      setLoading(false);

      if (isBack) {
        history.push("/onboarding/scan-result");
      }
    },
    [photo, dispatch, institution, isBack]
  );

  const handleRestartPhoto = useCallback(() => {
    log.info("remove front", "cameraPhoto");
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

  useLayout({ showNextButton: !!photo, goToBack });

  return (
    <StepFrontDocumentView
      handleTakePhoto={isBack ? handleTakeBackPhoto : handleTakeFrontPhoto}
      cameraState={cameraState}
      error={error}
      photoCaptureMsg={photoCaptureMsg}
      documentType={paramsArray[1]}
    />
  );
};
export default StepFrontDocument;
