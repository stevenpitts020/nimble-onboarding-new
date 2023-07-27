import * as Sentry from "@sentry/react";

const ImageToBase64 = (img: any) => {
  let dataUrl;

  if (img === undefined) {
    return null;
  }

  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = img.height;
    canvas.width = img.width;
    ctx?.putImageData(img, 0, 0);
    dataUrl = canvas.toDataURL();
  } catch (error) {
    Sentry.captureException(error);
  }
  return dataUrl;
};
export default ImageToBase64;
