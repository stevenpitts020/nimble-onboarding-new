import React from "react";
import { ArrowRight, ArrowLeft } from "react-feather";
import Button from "../Common/Button/Button";
import { IFooterViewProps } from "./types";
import Tips from "./Tips";
import "./Footer.sass";

const FooterView: React.FC<IFooterViewProps> = ({
  showBackButton,
  showNextButton,
  goToNext,
  goToBack,
  customNextButtonName,
}) => (
  <div className="ni-footer z-10">
    <Tips show={showNextButton} />
    <div className="bg-white border-t border-neutral30">
      <div className="flex flex-1 px-16 py-4">
        {showBackButton && (
          <Button
            onClick={goToBack}
            className="ni-back rounded-lg text-neutral50 "
          >
            <ArrowLeft className="m-0 ni-back-icon" />
            <span className="ml-2 font-semibold leading-4">Back</span>
          </Button>
        )}
        {showNextButton && (
          <Button onClick={goToNext} className="is-green ml-auto rounded-lg">
            <span className="mr-2">
              {customNextButtonName ? customNextButtonName : "Next"}
            </span>{" "}
            <ArrowRight className="m-0" />
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default FooterView;
