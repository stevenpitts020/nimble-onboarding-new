import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "react-feather";
import Tips from "../../Footer/Tips";
import FooterTimer from "../../FooterTimer/FooterTimer";
import { IFooter } from "../types";
import clsx from "clsx";

const Footer: React.FC<IFooter> = ({
  onNext,
  onBack,
  nextButtonLabel,
  hideBackButton,
  hideNextButton,
  disableNextButton,
  showTips,
  tips,
  showTimer = true,
  additionalElement,
  autoHeight,
  footerClassName,
}) => {
  const history = useHistory();

  const onClickBack = useCallback(
    () => onBack?.() || history.goBack(),
    [onBack]
  );

  return (
    <>
      <Tips show={showTips} />
      <footer
        className={clsx(
          "flex justify-between items-start w-full bg-white px-16 pt-[18px] pb-[18px]",
          footerClassName,
          autoHeight ? "h-auto" : "h-20"
        )}
      >
        {showTimer ? <FooterTimer /> : <div />}
        {additionalElement}

        <div className="flex items-center">
          <div className="mr-5">{tips}</div>
          {!hideBackButton && (
            <button
              className="flex z-50 items-center px-[30px] py-[14px] rounded-full text-manatee text-18/23 font-semibold"
              onClick={onClickBack}
            >
              <ArrowLeft className="mr-3" /> Back
            </button>
          )}
          {!hideNextButton && (
            <button
              disabled={disableNextButton}
              className={clsx(
                "flex z-50 items-center px-[30px] py-[14px] bg-main-accent rounded-[12px] text-18/23 text-white font-bold",
                { "bg-neutral30": disableNextButton }
              )}
              onClick={onNext}
            >
              {nextButtonLabel} <ArrowRight className="ml-3" />
            </button>
          )}
        </div>
      </footer>
    </>
  );
};

export default Footer;
