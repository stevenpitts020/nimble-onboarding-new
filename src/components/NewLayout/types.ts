import React from "react";

export interface ILayout {
  className?: string;
  classNameContainer?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  dataTestId?: string;
  onGetStarted?: () => void;
  disableGetStarted?: boolean;
  isBankHeader?: boolean;
  isCloud?: boolean;
  hideFooter?: boolean;
  hideHeader?: boolean;
  showTimer?: boolean;
  sidebarType?: string;
  sidebarProps?: ISidebarVerifyIdentity | ISidebarNavigation;
  onClickNext?: () => void;
  onClickBack?: () => void;
  onClick?: (e: any) => void;
  nextButtonLabel?: string;
  hideBackButton?: boolean;
  hideNextButton?: boolean;
  disableNextButton?: boolean;
  disableEnter?: boolean;
  tips?: React.ReactNode;
  showTips?: boolean;
  additionalFooterElement?: React.ReactNode;
  footerAutoHeight?: boolean;
  footerClassName?: string;
  onlyPrivacy?: boolean;
}

export interface IFooter {
  onNext?: () => void;
  onBack?: () => void;
  nextButtonLabel?: string;
  hideBackButton?: boolean;
  hideNextButton?: boolean;
  disableNextButton?: boolean;
  tips?: React.ReactNode;
  showTips?: boolean;
  showTimer?: boolean;
  additionalElement?: React.ReactNode;
  autoHeight?: boolean;
  footerClassName?: string;
}

export interface ISidebarVerifyIdentity {
  customText?: React.ReactNode;
  className?: string;
}

export interface ISidebarNavigation {
  isHideSideBar?: boolean;
  isHideLogo?: boolean;
  showTimer?: boolean;
  showTips?: boolean;
}
