import React, { FC } from "react";
import { IPhotoPreview } from "./types";
import "../PhotoPreviewWithControls/photo-preview.sass";
const defaultProps = {
  alt: "Example",
};

const PhotoPreview: FC<IPhotoPreview> = ({
  className,
  style,
  imageData,
  alt,
}) => (
  <div
    data-testid="PhotoPreview"
    className={`ni-photo-preview ${className}`}
    style={style}
  >
    {imageData && <img alt={alt} src={imageData} className="photo" />}
  </div>
);

PhotoPreview.defaultProps = defaultProps;
export default PhotoPreview;
