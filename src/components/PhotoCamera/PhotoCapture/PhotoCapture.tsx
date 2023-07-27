import React, { FC, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import NoCameraMessage from "../NoCameraMessage/NoCameraMessage";
import PhotoCaptureView from "./PhotoCaptureView";
import { log } from "../../../services";
import { IPhotoCapture } from "./type";
import "./photo-capture.sass";

const defaultProps = {
  width: 640,
  height: 420,
  facingMode: "user",
};

const PhotoCapture: FC<IPhotoCapture> = (props: IPhotoCapture) => {
  const [message, setMessage] = React.useState("");

  // need to destructure this prop
  const { onFlipCamera, onTakePhoto, allowFlip } = props;
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const { current } = webcamRef;
    if (current) {
      const imageSrc = current?.getScreenshot();
      log.info("took picture", "photoCapture");
      onTakePhoto(imageSrc || "");
    }
  }, [webcamRef, onTakePhoto]);

  const handleNoCameraError = () => {
    const msg = "We didn't find a camera on this device";
    log.warn("camera not working", "cameraPhoto");
    document.body.style.overflow = "auto";
    setMessage(msg);
  };

  // if there is an error, show no camera message
  if (message) {
    return (
      <NoCameraMessage title={message}>
        <p>
          Make sure you clicked <b>Allow</b> on the tooltip prompted by your
          browser.
        </p>
        <p>
          If you don&apos;t have a camera on this device scan this QR code with
          your smartphone or tablet to complete the process.
        </p>
      </NoCameraMessage>
    );
  }

  return (
    <PhotoCaptureView
      height={defaultProps.height}
      props={props}
      width={defaultProps.width}
      allowFlip={allowFlip}
      handleNoCameraError={handleNoCameraError}
      onFlipCamera={onFlipCamera}
      capture={capture}
      webcamRef={webcamRef}
    />
  );
};

PhotoCapture.defaultProps = defaultProps;
export default PhotoCapture;
