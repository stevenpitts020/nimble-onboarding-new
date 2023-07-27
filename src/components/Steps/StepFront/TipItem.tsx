import React, { FC } from "react";
import { ITipItem } from "./types";

const TipItem: FC<ITipItem> = ({ number, text }) => {
  return (
    <div className="flex h-10">
      <div className="flex justify-center items-center h-8 w-8 bg-darkerBlue rounded-full">
        <p className="font-inter text-white text-base font-bold">{number}</p>
      </div>
      <div className="ml-5 w-[240px] pt-1">
        <p className="font-lato font-bold text-sm">{text}</p>
      </div>
    </div>
  );
};

export default TipItem;
