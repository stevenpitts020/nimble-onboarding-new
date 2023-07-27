import React from "react";
import { ReactComponent as ScanLines } from "./Line.svg";

const PhotoPreviewNew = ({ image }) => {
  return (
    <div className="flex justify-center items-center bg-white w-[545px] h-[360px] overflow-hidden rounded-2xl relative">
      <img
        src={image}
        className="absolute w-[539px] h-[354px] rounded-2xl"
        alt="document"
      />
      <ScanLines className="absolute w-[600px] h-[360px]" />
    </div>
  );
};

export default PhotoPreviewNew;
