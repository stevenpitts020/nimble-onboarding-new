import React from "react";
import {
  INTRODUCTION_TITLE,
  INTRODUCTION_SUBTITLE,
  FRONT_OF_ID,
  BACK_OF_ID,
  FACIAL_RECOGNITION,
} from "../../../utils/constants/general";
import IntroductionCards from "./IntroductionCards";
import frontOfId from "./frontOfId.svg";
import backOfId from "./backOfId.svg";
import facialRecognition from "./facialRecognition.svg";

const StepIntroductionView = ({ goToNext }) => {
  return (
    <div className="ni-step-introduction">
      <div className="text-center font-inter">
        <h1 className="text-2xl font-bold text-dark leading-9">
          {INTRODUCTION_TITLE}
        </h1>
        <p className="text-gray text-base mt-2 mb-10 leading-6 px-10">
          {INTRODUCTION_SUBTITLE}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[15px]">
        <IntroductionCards
          title={FRONT_OF_ID}
          image={frontOfId}
          onClick={goToNext}
        />
        <IntroductionCards
          title={BACK_OF_ID}
          image={backOfId}
          onClick={goToNext}
        />
        <IntroductionCards
          title={FACIAL_RECOGNITION}
          image={facialRecognition}
          isFacialRecognition
          onClick={goToNext}
        />
      </div>
    </div>
  );
};

export default StepIntroductionView;
