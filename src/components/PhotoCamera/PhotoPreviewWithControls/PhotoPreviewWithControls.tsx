import React from "react";
import { RefreshCcw, Check } from "react-feather";
import PhotoPreview from "../PhotoPreview/PhotoPreview";
import "./photo-preview.sass";
import { IPreview } from "./types";
import Button from "../../Common/Button/Button";

/* Simplify Preview Image and Restart Photo Button */
const PhotoPreviewWithControls = (props: IPreview) => (
  <div className="preview-container">
    <div className="photo-preview">
      <PhotoPreview imageData={props.imageData} alt={props.alt} />
      <div className="action-buttons">
        <Button
          onClick={props.onRepeat}
          data-testid="RestartPhoto"
          className="is-pill restart"
        >
          <RefreshCcw />
          Repeat Photo
        </Button>
        <Button
          onClick={props.onContinue}
          disabled={props.loading || !props.imageData}
          className="is-green is-pill"
        >
          <Check />
          Continue
        </Button>
      </div>
    </div>
  </div>
);

PhotoPreviewWithControls.defaultProps = { loading: false };
export default PhotoPreviewWithControls;
