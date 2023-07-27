import React, { FC } from "react";
import { IPhotoPreview } from "./types";

const defaultProps = {
  alt: "Example",
};

const PhotoPreview: FC<IPhotoPreview> = (props) => (
  <div
    data-testid="PhotoPreview"
    className={`ni-photo-preview ${props.className}`}
    style={props.style}
  >
    {props.imageData ? (
      <img alt={props.alt} src={props.imageData} className="photo" />
    ) : (
      <p>We couldn&apos;t capture your last photo. Can you try again?</p>
    )}
  </div>
);

PhotoPreview.defaultProps = defaultProps;
export default PhotoPreview;
