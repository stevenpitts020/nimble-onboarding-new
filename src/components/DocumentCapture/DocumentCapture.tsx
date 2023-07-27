import * as BlinkIDSDK from "@microblink/blinkid-in-browser-sdk";
import "./DocumentCapture.sass";
import { RecognizerResultState } from "@microblink/blinkid-in-browser-sdk";
import * as Sentry from "@sentry/react";
import React, { useRef, useEffect, useState } from "react";
import { log } from "../../services";
import Config from "../../services/Config";
import DocumentCaptureView from "./DocumentCaptureView";
import { IDocumentCapture } from "./types";

interface ErrorWithName {
  name: string;
}

const DocumentCapture: React.FC<IDocumentCapture> = (
  props: IDocumentCapture
) => {
  const FIRST_SCAN_TIMEOUT = 2000000;
  const RESULTS_TIMEOUT = 4000;
  const FLIP_ANIMATION_TIMEOUT = 3000;
  const MICROBLINK_DEFAULT_TIMEOUT = 25000;
  const cameraFeed = useRef<HTMLVideoElement>(null);
  let documentType = props.documentType;
  // Canvas
  const cameraFeedback = useRef<HTMLCanvasElement>(null);
  const screenGrab = useRef<HTMLCanvasElement>(null);
  const [drawContext, setDrawContext] = useState<CanvasRenderingContext2D>();
  let videoRecognizer: BlinkIDSDK.VideoRecognizer;
  let recognizerRunner: BlinkIDSDK.RecognizerRunner;
  // Video Guides
  const [videoMessage, setVideoMessage] = useState("");
  const [scanStatus, setScanStatus] = useState("");
  let isFrontSideDone = false;
  // 0 - Fail
  // 1 - Some sort of detection
  // 3 - some sort of detection
  let detectionStatus = 0;
  let isScanningDone = false;
  let backImage: string | BlinkIDSDK.ImageResult;

  useEffect(() => {
    const canvas = cameraFeedback.current;
    const video = cameraFeed.current;
    const ctx = canvas?.getContext("2d");

    document.body.style.overflow = "hidden";
    if (ctx) {
      setDrawContext(ctx);
      BlinkIDSDK.loadWasmModule(loadSettings).then(
        (sdk: BlinkIDSDK.WasmSDK) => {
          startScan(sdk);
        },
        (error: any) => {
          log.info("Failed to load SDK!", error);
          document.body.style.overflow = "auto";
          props.onLoadFail(error);
        }
      );
    }
    // sets a 20 second window to have a first side result
    // if by the end of those 20 seconds there's no first side result
    // and no detection is in progress fallback
    const firstScanInterval = setInterval(() => {
      if (
        video &&
        recognizerRunner &&
        detectionStatus === 0 &&
        !isFrontSideDone
      ) {
        log.info("No detection after 20 sec", "DocumentCapture");
        recognizerRunner.delete();
        video.srcObject = null;
        document.body.style.overflow = "auto";
        // only need to delete the runner if it started
        if (videoRecognizer) {
          videoRecognizer.cancelRecognition();
          videoRecognizer.releaseVideoFeed();
        }
        props.onLoadFail("fallback");
      }
    }, FIRST_SCAN_TIMEOUT);
    return () => clearInterval(firstScanInterval);
  }, [cameraFeedback]);

  const loadSettings = new BlinkIDSDK.WasmSDKLoadSettings(
    Config.microblinkAuth
  );
  // This must be an absolute path
  loadSettings.engineLocation = Config.microblinkCdnVersion
    ? `https://unpkg.com/@microblink/blinkid-in-browser-sdk@${Config.microblinkCdnVersion}/resources/`
    : `${Config.domain}/vendored/microblink/resources/`;

  async function startScan(sdk: any) {
    try {
      const combinedGenericIDRecognizer =
        await BlinkIDSDK.createBlinkIdCombinedRecognizer(sdk);
      const recognizerSettings =
        await combinedGenericIDRecognizer.currentSettings();
      recognizerSettings.returnFullDocumentImage = true;
      recognizerSettings.returnSignatureImage = true;
      recognizerSettings.returnFaceImage = true;
      recognizerSettings.fullDocumentImageDpi = 300;
      await combinedGenericIDRecognizer.updateSettings(recognizerSettings);
      const genericIDRecognizerSfg =
        await BlinkIDSDK.createSuccessFrameGrabberRecognizer(
          sdk,
          combinedGenericIDRecognizer
        );
      const callbacks = {
        onQuadDetection(quad: BlinkIDSDK.DisplayableQuad) {
          setupMessage(quad);
        },
        onFirstSideResult() {
          isFrontSideDone = true;
          updateScanFeedback("Flip your document", "flip", true);
          // pause the recognition in order to allow the flip document
          // animation to do it's job
          videoRecognizer.pauseRecognition();
          setTimeout(() => {
            // resume the recognition with the reset recognizers set to false
            videoRecognizer.resumeRecognition(false);
          }, FLIP_ANIMATION_TIMEOUT);
        },
      };

      const video = cameraFeed?.current;
      recognizerRunner = await BlinkIDSDK.createRecognizerRunner(
        sdk,
        [genericIDRecognizerSfg],
        false,
        callbacks
      );
      videoRecognizer =
        await BlinkIDSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
          video!,
          recognizerRunner
        );
      video!.onplaying = () => {
        updateScanFeedback(
          `Please scan the FRONT of your ${documentType} first`,
          "waiting"
        );
      };
      // the timeout is only necessary if the doc is a driver's licence
      if (documentType === "USDL") {
        window.setTimeout(() => {
          if (!isScanningDone && videoRecognizer) {
            log.info("timedout with a usdl doc", "DocumentCapture");

            isScanningDone = true;
            updateScanFeedback("Processing your document", "done", true);
            videoRecognizer.cancelRecognition();
          }
        }, MICROBLINK_DEFAULT_TIMEOUT);
      }

      videoRecognizer.startRecognition(
        async (recognitionState) => {
          log.info(
            `start recognitionState ${recognitionState}`,
            "DocumentCapture"
          );
          log.info(`videoRecognizer ${videoRecognizer}`, "DocumentCapture");

          if (!videoRecognizer) {
            log.info(
              "no video recognizer loaded, falling back",
              "DocumentCapture"
            );
            return props.onLoadFail("fallback");
          }
          // Pause recognition before performing any async operation
          videoRecognizer.pauseRecognition();

          if (recognitionState === BlinkIDSDK.RecognizerResultState.Empty) {
            log.info("recognitionState is 0, falling back", "DocumentCapture");
            return props.onLoadFail("fallback");
          }
          const result = await combinedGenericIDRecognizer.getResult();
          if (result.state === BlinkIDSDK.RecognizerResultState.Empty) {
            log.info(
              `result state is 0, falling back ${result}`,
              "DocumentCapture"
            );
            return props.onLoadFail("fallback");
          }

          if (
            result.state === BlinkIDSDK.RecognizerResultState.Uncertain &&
            !result.fullDocumentFrontImage.rawImage
          ) {
            log.info(
              `result state is uncertain and there is no image, falling back ${result}`,
              "DocumentCapture"
            );
            return props.onLoadFail("fallback");
          }

          // system doc types:
          // 0 - driver licence
          // 1 - mrz on front
          // 2 - passport
          const systemDocumentType =
            result.mrz.documentType === 0 ? "USDL" : "PASSPORT";
          if (systemDocumentType !== documentType) {
            log.info(
              "User Selected document type doesnt match system document type",
              "DocumentCapture"
            );
            documentType = systemDocumentType;
          }
          // Inform the user about results
          // handle situations when we have partial, full results or none
          if (
            [
              BlinkIDSDK.RecognizerResultState.StageValid,
              BlinkIDSDK.RecognizerResultState.Uncertain,
            ].includes(result.state) &&
            documentType !== "PASSPORT"
          ) {
            log.info(
              "We couldn't scan the back of your document",
              "DocumentCapture"
            );
            log.info("result state is 3, falling back", "DocumentCapture");
            // back image fallback
            if (result.fullDocumentBackImage.rawImage) {
              backImage = result.fullDocumentBackImage;
            } else {
              backImage = captureDocument();
            }
            updateScanFeedback(
              "Processing the front of your document",
              "done",
              true
            );
          } else if (result.state === BlinkIDSDK.RecognizerResultState.Valid) {
            log.info(
              "Back and front of your document processed",
              "DocumentCapture"
            );
            updateScanFeedback("Processing your document", "done", true);
          } else {
            log.info("Are we done?", "DocumentCapture");
            updateScanFeedback("done", "done", true);
          }

          setTimeout(() => {
            log.info("inside timeout", "DocumentCapture");

            videoRecognizer.releaseVideoFeed();
            recognizerRunner.delete();
            combinedGenericIDRecognizer.delete();
            clearDrawCanvas();
            document.body.style.overflow = "auto";

            if (result.state !== BlinkIDSDK.RecognizerResultState.Empty) {
              const dateOfBirth = result.dateOfBirth
                ? `${result.dateOfBirth.year}-${
                    result.dateOfBirth.month.toString().length === 1
                      ? `0${result.dateOfBirth.month.toString()}`
                      : result.dateOfBirth.month
                  }-${
                    result.dateOfBirth.day.toString().length === 1
                      ? `0${result.dateOfBirth.day.toString()}`
                      : result.dateOfBirth.day
                  }`
                : "";
              const documentIssuedDate = result.dateOfIssue
                ? `${result.dateOfIssue.year}-${
                    result.dateOfIssue.month.toString().length === 1
                      ? `0${result.dateOfIssue.month.toString()}`
                      : result.dateOfIssue.month
                  }-${
                    result.dateOfIssue.day.toString().length === 1
                      ? `0${result.dateOfIssue.day.toString()}`
                      : result.dateOfIssue.day
                  }`
                : "";
              const documentExpirationDate = result.dateOfExpiry
                ? `${result.dateOfExpiry.year}-${
                    result.dateOfExpiry.month.toString().length === 1
                      ? `0${result.dateOfExpiry.month.toString()}`
                      : result.dateOfExpiry.month
                  }-${
                    result.dateOfExpiry.day.toString().length === 1
                      ? `0${result.dateOfExpiry.day.toString()}`
                      : result.dateOfExpiry.day
                  }`
                : "";

              log.info("passing results", "DocumentCapture");

              props.onResults({
                address: result.address,
                dateOfBirth,
                documentExpirationDate,
                documentIssuedDate:
                  documentIssuedDate !== "0-00-00"
                    ? documentIssuedDate
                    : "1900-01-01",
                firstName: result.firstName,
                lastName: result.lastName,
                fullDocumentBackImage:
                  result.state === RecognizerResultState.Uncertain ||
                  result.state === RecognizerResultState.StageValid
                    ? backImage
                    : result.fullDocumentBackImage,
                fullDocumentFrontImage: result.fullDocumentFrontImage,
                documentNumber: result.documentNumber,
                barcode: result.barcode,
                documentIssuer: result.issuingAuthority || result.mrz.issuer,
                documentType,
              });
            }
            document.body.style.overflow = "auto";
          }, RESULTS_TIMEOUT);
        }
        // note this timeout is only triggered after the 1st scan is complete
      );
    } catch (error) {
      log.error(error, "DocumentCapture");
      Sentry.captureException(error);

      if ((error as ErrorWithName).name === "VideoRecognizerError") {
        log.error((error as ErrorWithName).name, "Document Capture");
        if (videoRecognizer) {
          videoRecognizer.cancelRecognition();
          videoRecognizer.releaseVideoFeed();
        }
        props.onNoCameraError("no cam");
      }
    }
  }
  // fallback for when we are not able to get a recognition from microblink backdoc
  const captureDocument = () => {
    const video = cameraFeed?.current;
    const canvas = document.createElement("canvas");
    if (canvas) {
      canvas.width = video!.videoWidth;
      canvas.height = video!.videoHeight;
      canvas
        .getContext("2d")
        ?.drawImage(video!, 0, 0, canvas.width, canvas.height);
    }
    const photo = canvas.toDataURL();
    // manual front side doc grab
    document.body.style.overflow = "auto";
    video!.srcObject = null;
    clearDrawCanvas();
    log.info("DocumentCapture", "done");
    return photo;
  };

  function clearDrawCanvas() {
    cameraFeedback.current!.width = cameraFeedback.current!.clientWidth;
    cameraFeedback.current!.height = cameraFeedback.current!.clientHeight;
    if (drawContext) {
      drawContext.clearRect(
        0,
        0,
        cameraFeedback.current!.width,
        cameraFeedback.current!.height
      );
    }
  }

  function setupMessage(displayable: BlinkIDSDK.Displayable) {
    switch (displayable.detectionStatus) {
      case BlinkIDSDK.DetectionStatus.Fail:
        detectionStatus = 0;
        if (!isFrontSideDone) {
          updateScanFeedback(
            `Please scan the FRONT of your ${documentType}`,
            "waiting"
          );
        } else {
          updateScanFeedback(
            `Please scan the BACK of your ${documentType}`,
            "waiting"
          );
        }

        break;
      case BlinkIDSDK.DetectionStatus.Success:
      case BlinkIDSDK.DetectionStatus.FallbackSuccess:
        detectionStatus = 1;
        updateScanFeedback("HOLD STEADY", "scanning");
        break;
      case BlinkIDSDK.DetectionStatus.CameraAtAngle:
        detectionStatus = 1;
        updateScanFeedback("Adjust the angle", "error");
        break;
      case BlinkIDSDK.DetectionStatus.CameraTooHigh:
        detectionStatus = 1;
        updateScanFeedback("Move your document closer to the camera", "error");
        break;
      case BlinkIDSDK.DetectionStatus.CameraTooNear:
      case BlinkIDSDK.DetectionStatus.DocumentTooCloseToEdge:
      case BlinkIDSDK.DetectionStatus.Partial:
        detectionStatus = 1;
        updateScanFeedback(
          "Move your document further away from the camera",
          "error"
        );
        break;
      default:
        log.warn("Unhandled detection status!", "error");
    }
  }
  let scanFeedbackLock = false;

  function updateScanFeedback(message: string, state: string, force?: boolean) {
    if (scanFeedbackLock && !force) {
      return;
    }
    scanFeedbackLock = true;
    setVideoMessage(message);
    setScanStatus(state);
    window.setTimeout(() => (scanFeedbackLock = false), 1000);
  }

  return (
    <DocumentCaptureView
      cameraFeed={cameraFeed}
      cameraFeedback={cameraFeedback}
      scanStatus={scanStatus}
      screenGrab={screenGrab}
      videoMessage={videoMessage}
    />
  );
};
export default DocumentCapture;
