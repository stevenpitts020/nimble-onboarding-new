import React from "react";
import Webcam from "react-webcam";
import clsx from "clsx";
import { IPhotoCaptureView } from "./type";
import DetectOS from "../../../utils/DetectOS";
import camFlipIcon from "./camFlipIcon.svg";
import ScannerLines from "./Line.svg";
import { ReactComponent as ButtonIcon } from "./round-button.svg";

const PhotoCaptureView = ({
  props,
  width,
  height,
  webcamRef,
  allowFlip,
  capture,
  onFlipCamera,
  handleNoCameraError,
}: IPhotoCaptureView) => {
  const { name } = DetectOS.getBrowser();
  const isFirefox =
    name.toLowerCase() === "firefox" || name.toLowerCase() === "mozilla";

  return (
    <div
      data-testid="photoCapture"
      className={`ni-photo-capture flex facing-${props.facingMode} ${props.className}`}
      style={props.style}
    >
      {props.facingMode === "environment" ? (
        <div className="flex">
          <div id="overlay" className="overlay-document">
            <div className="overlay-document__scan">
              <div className="scan-line" />
              <div className="overlay-document__scan-shadow" />
            </div>
          </div>
          <div className="absolute -bottom-[121px] left-[50%] z-[1000] -translate-x-[50%]">
            <ButtonIcon onClick={capture} className="cursor-pointer" />
            <div className="text-blueDarkerSecond font-lato text-10 font-black uppercase mt-2">
              take photo
            </div>
          </div>
        </div>
      ) : (
        width > 1448 &&
        height > 740 && (
          <div className="overlay-face">
            <div className="overlay-document__scan">
              <div className="overlay-document__scan-shadow" />
            </div>
          </div>
        )
      )}
      <div className="ni-photo-capture-content">
        <div className="absolute w-[120%] h-[210px] left-[-10%] z-50 bg-zirkon top-[-210px] flex flex-wrap justify-center pt-[140px]">
          <p className="w-full font-black text-2xl font-lato text-darkest leading-none">
            {props.header}
          </p>
        </div>
        <img
          src={ScannerLines}
          alt="line"
          className={clsx("videoImg", isFirefox ? "mozVideo" : "")}
        />
        <div
          className={clsx(
            "absolute w-[120%] h-[120px] left-[-10%] z-40 bg-zirkon",
            isFirefox ? "top-[488px]" : "top-[428px]"
          )}
        />
        <div className="video-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            imageSmoothing={false}
            videoConstraints={{
              width,
              height,
              facingMode: props.facingMode,
            }}
            onUserMediaError={handleNoCameraError}
            onUserMedia={(stream) => {
              if (props.setIsCameraReady) {
                setTimeout(() => props.setIsCameraReady?.(stream?.active), 500);
              }
            }}
          />
        </div>
        {allowFlip && (
          <button
            className="flip-button button is-icon is-pill"
            onClick={onFlipCamera}
            data-testid="flipButton"
          >
            <img src={camFlipIcon} alt="flip camera icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoCaptureView;
