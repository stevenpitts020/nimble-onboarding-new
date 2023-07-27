import React, { Dispatch, SetStateAction } from "react";

export type TShow = boolean | undefined;

type TShowFunc = (show: TShow) => void;

interface ILayoutContext {
  showNextButton: TShow;
  showBackButton: TShow;
  showSideBar: TShow;
  showLogoSideBar: TShow;
  showTimer: TShow;
  showLogoHeader: TShow;
  customNextButtonName: undefined | string;
  withoutEnter: TShow;
}

interface IGoToFunc {
  goToNext: () => void;
  goToBack: () => void;
}

export interface ILayout extends Partial<ILayoutContext>, IGoToFunc {
  customGoToNextRef?: React.MutableRefObject<() => void>;
  customGoToBackRef?: React.MutableRefObject<() => void>;
  setCustomNextButtonName?: Dispatch<SetStateAction<string | undefined>>;
  setWithoutEnter?: TShowFunc;
  setShowBackButton: TShowFunc;
  setShowNextButton: TShowFunc;
  setShowSideBar: TShowFunc;
  setShowLogoSideBar: TShowFunc;
  setShowTimer: TShowFunc;
  setShowLogoHeader: TShowFunc;
}

export interface IProps {
  children: React.ReactNode;
}

export interface IUseLayoutParams
  extends Partial<ILayoutContext>,
    Partial<IGoToFunc> {}

export interface IUseLayoutContext extends ILayoutContext, IGoToFunc {}

export type IUseLayout = (params?: IUseLayoutParams) => void;
