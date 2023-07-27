import React, { useState } from "react";
import clsx from "clsx";
import { ILayout, ISidebarNavigation, ISidebarVerifyIdentity } from "./types";
import Header from "./components/Header";
import BankHeader from "./components/BankHeader";
import Footer from "./components/Footer";
import SidebarVerifyIdentity from "./components/SidebarVerifyIdentity";
import SidebarNavigation from "./components/SidebarNavigation";
import { ReactComponent as Cloud } from "./img/Cloud.svg";
import useEnterHotKey from "../../hooks/useEnterHotKey";
import DataPrivacy from "../Legal/DataPrivacyComponent/DataPrivacy";
import { ID_MAIN_LAYOUT } from "../../utils/constants/general";

export const SIDEBAR_TYPE = {
  VERIFY_IDENTITY: "VERIFY_IDENTITY",
  NAVIGATION: "NAVIGATION",
};

const defaultProps = {
  className: "",
  classNameContainer: "",
  nextButtonLabel: "Next",
  onClick: () => {},
};

export const Layout: React.FC<ILayout> = ({
  children,
  className,
  classNameContainer,
  style,
  dataTestId,
  onGetStarted,
  disableGetStarted,
  isBankHeader,
  isCloud,
  hideFooter,
  hideHeader,
  showTimer,
  sidebarProps,
  sidebarType,
  onClickNext,
  onClickBack,
  onClick,
  nextButtonLabel,
  hideBackButton,
  hideNextButton,
  disableNextButton,
  tips,
  showTips,
  additionalFooterElement,
  footerAutoHeight,
  footerClassName,
  disableEnter,
  onlyPrivacy,
}) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const togglePrivacy = () => setPrivacyOpen(!privacyOpen);
  useEnterHotKey(onClickNext, !disableNextButton && !disableEnter);

  return (
    <div
      data-testid={dataTestId}
      className={clsx("ni-layout h-full flex", className)}
      style={style}
      onClick={onClick}
    >
      {sidebarType === SIDEBAR_TYPE.VERIFY_IDENTITY && (
        <SidebarVerifyIdentity {...(sidebarProps as ISidebarVerifyIdentity)} />
      )}
      {sidebarType === SIDEBAR_TYPE.NAVIGATION && (
        <SidebarNavigation {...(sidebarProps as ISidebarNavigation)} />
      )}
      <DataPrivacy open={privacyOpen} togglePrivacy={togglePrivacy} />

      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-1 flex-col relative ni-onboarding-content-fix-height">
          <div>
            {!hideHeader &&
              (isBankHeader ? (
                <BankHeader />
              ) : (
                <Header
                  togglePrivacy={togglePrivacy}
                  onGetStarted={onGetStarted}
                  disableGetStarted={disableGetStarted}
                />
              ))}
            {hideHeader && onlyPrivacy && (
              <div className="flex flex-1 justify-end items-center pt-4 px-16 mx-2">
                <button
                  onClick={togglePrivacy}
                  className="font-bold py-3 px-6 mr-4"
                >
                  Data Privacy
                </button>
              </div>
            )}
          </div>

          <div id={ID_MAIN_LAYOUT} className={classNameContainer}>
            {children}
          </div>
          {isCloud && (
            <>
              <Cloud className="z-[-1] absolute top-[196px] left-[201px]" />
              <Cloud className="z-[-1] absolute top-[255px] right-[180px]" />
              <Cloud className="z-[-1] absolute h-[70px] w-[175px] top-[500px] right-[140px]" />
            </>
          )}
        </div>
        {!hideFooter && (
          <Footer
            onNext={onClickNext}
            onBack={onClickBack}
            nextButtonLabel={nextButtonLabel}
            hideBackButton={hideBackButton}
            hideNextButton={hideNextButton}
            disableNextButton={disableNextButton}
            tips={tips}
            showTips={showTips}
            showTimer={showTimer}
            additionalElement={additionalFooterElement}
            autoHeight={footerAutoHeight}
            footerClassName={footerClassName}
          />
        )}
      </div>
    </div>
  );
};

Layout.defaultProps = defaultProps;
