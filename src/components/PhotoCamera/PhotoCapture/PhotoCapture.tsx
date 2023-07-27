import React, { useRef, useCallback, FC } from "react";
import Webcam from "react-webcam";
import { log } from "../../../services";
import NoCameraMessage from "../NoCameraMessage/NoCameraMessage";
import "./photo-capture.sass";
import useWindowDimensions from "../../windowDimensions";
import { IPhotoCapture } from "./type";
import PhotoCaptureView from "./PhotoCaptureView";

const defaultProps = {
  width: 1200,
  height: 740,
  facingMode: "user",
};

const PhotoCapture: FC<IPhotoCapture> = (props: IPhotoCapture) => {
  const [message, setMessage] = React.useState("");
  const { height, width } = useWindowDimensions();

  // need to destructure this prop
  const { onTakePhoto, onFlipCamera, allowFlip } = props;
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
      capture={capture}
      height={height}
      props={props}
      width={width}
      allowFlip={allowFlip}
      handleNoCameraError={handleNoCameraError}
      onFlipCamera={onFlipCamera}
      webcamRef={webcamRef}
    />
  );
};

PhotoCapture.defaultProps = defaultProps;
export default PhotoCapture;
