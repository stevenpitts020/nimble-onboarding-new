import React from "react";
import { IIntroductionCards } from "./types";
import clsx from "clsx";

const IntroductionCards = ({
  title,
  image,
  isFacialRecognition,
  onClick,
}: IIntroductionCards) => (
  <button
    onClick={onClick}
    className={
      "rounded-lg max-w-[166px] max-h-[156px] border border-grayLight cursor-pointer"
    }
  >
    <div
      className={clsx("text-center max-h-[112px] bg-lightestGraySecond p-auto")}
    >
      <img
        src={image}
        alt=""
        className={clsx("p-[17px]", isFacialRecognition && "ml-5")}
      />
    </div>
    <p className="text-base text-dark mb-2 mt-5 text-center font-inter">
      {title}
    </p>
  </button>
);

export default IntroductionCards;
