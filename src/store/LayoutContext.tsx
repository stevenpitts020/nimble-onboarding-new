import React, {
  useCallback,
  useMemo,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  ILayout,
  IProps,
  IUseLayout,
  IUseLayoutContext,
  TShow,
} from "./LayoutContextType";
import { useHistory } from "react-router-dom";
import { UrlContext } from "./UrlContext";
import {
  stepsWithoutBackButton,
  stepsWithNextButton,
  stepsWithTimer,
  stepWithoutEnterHotKey,
  stepsWithLogoInHeader,
  stepsWithoutSidebar,
} from "../utils/constants/layoutConfig";

export const LayoutContext = React.createContext<ILayout | undefined>(
  undefined
);

export const LayoutProvider: React.FC<IProps> = ({ children }) => {
  const { currentStep } = useContext(UrlContext);
  const history = useHistory();
  const defaultGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const [showBackButton, setShowBackButton] = useState<TShow>(undefined);
  const [showNextButton, setShowNextButton] = useState<TShow>(undefined);
  const [showSideBar, setShowSideBar] = useState<TShow>(undefined);
  const [showLogoSideBar, setShowLogoSideBar] = useState<TShow>(undefined);
  const [showTimer, setShowTimer] = useState<TShow>(undefined);
  const [withoutEnter, setWithoutEnter] = useState<TShow>(undefined);
  const [customNextButtonName, setCustomNextButtonName] = useState<
    string | undefined
  >("");
  const [showLogoHeader, setShowLogoHeader] = useState<TShow>(undefined);
  const customGoToNextRef = useRef<() => void>(() => {});
  const customGoToBackRef = useRef<() => void>(defaultGoBack);

  const goToNext = useCallback(() => {
    if (customGoToNextRef.current) {
      customGoToNextRef.current();
    }
  }, []);

  const goToBack = useCallback(() => {
    if (customGoToBackRef.current) {
      customGoToBackRef.current();
    }
  }, []);

  useEffect(() => {
    setShowBackButton(!stepsWithoutBackButton.includes(currentStep));
    setShowNextButton(stepsWithNextButton.includes(currentStep));
    setShowSideBar(!stepsWithoutSidebar.includes(currentStep));
    setShowLogoSideBar(
      !stepsWithLogoInHeader.includes(currentStep) &&
        !stepsWithoutSidebar.includes(currentStep)
    );
    setShowTimer(stepsWithTimer.includes(currentStep));
    setWithoutEnter(stepWithoutEnterHotKey.includes(currentStep));
    setShowLogoHeader(stepsWithLogoInHeader.includes(currentStep));
  }, [currentStep]);

  const value = useMemo<ILayout>(
    () => ({
      showNextButton,
      showBackButton,
      showSideBar,
      showLogoSideBar,
      showTimer,
      withoutEnter,
      customNextButtonName,
      showLogoHeader,
      goToNext,
      goToBack,
      customGoToNextRef,
      customGoToBackRef,
      setShowBackButton,
      setShowNextButton,
      setShowSideBar,
      setShowLogoSideBar,
      setShowTimer,
      setCustomNextButtonName,
      setShowLogoHeader,
    }),
    [
      goToNext,
      goToBack,
      showNextButton,
      showBackButton,
      showSideBar,
      showLogoSideBar,
      showTimer,
      withoutEnter,
      customNextButtonName,
      showLogoHeader,
    ]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayout: IUseLayout = ({
  goToNext,
  goToBack,
  showNextButton,
  showBackButton,
  showSideBar,
  showLogoSideBar,
  showTimer,
  withoutEnter,
  customNextButtonName,
  showLogoHeader,
} = {}) => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  const {
    customGoToNextRef,
    customGoToBackRef,
    setShowBackButton,
    setShowNextButton,
    setShowSideBar,
    setShowLogoSideBar,
    setShowTimer,
    setCustomNextButtonName,
    setWithoutEnter,
    setShowLogoHeader,
  } = context;

  const history = useHistory();
  const defaultGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    if (customGoToNextRef) {
      customGoToNextRef.current = goToNext || (() => {});
    }
    return () => {
      if (customGoToNextRef) {
        customGoToNextRef.current = () => {};
      }
    };
  }, [goToNext, customGoToNextRef]);

  useEffect(() => {
    if (customGoToBackRef) {
      customGoToBackRef.current = goToBack || defaultGoBack;
    }
    return () => {
      if (customGoToBackRef) {
        customGoToBackRef.current = defaultGoBack;
      }
    };
  }, [goToBack, customGoToBackRef]);

  useEffect(() => {
    setShowBackButton(showBackButton);
  }, [showBackButton]);

  useEffect(() => {
    setShowNextButton(showNextButton);
  }, [showNextButton]);

  useEffect(() => {
    setShowSideBar(showSideBar);
  }, [showSideBar]);

  useEffect(() => {
    setShowLogoSideBar(showLogoSideBar);
  }, [showLogoSideBar]);

  useEffect(() => {
    setShowTimer(showTimer);
  }, [showTimer]);
  useEffect(() => {
    if (setWithoutEnter) {
      setWithoutEnter(withoutEnter);
    }
  }, [withoutEnter]);

  useEffect(() => {
    if (setCustomNextButtonName) {
      setCustomNextButtonName(customNextButtonName);
    }
  }, [customNextButtonName]);

  useEffect(() => {
    setShowLogoHeader(showLogoHeader);
  }, [showLogoHeader]);
};

export const useLayoutContext = (): IUseLayoutContext => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  const {
    showNextButton,
    showBackButton,
    showSideBar,
    showLogoSideBar,
    showTimer,
    customNextButtonName,
    withoutEnter,
    showLogoHeader,
    goToNext,
    goToBack,
  } = context;

  return {
    showNextButton,
    showBackButton,
    showSideBar,
    showLogoSideBar,
    showTimer,
    withoutEnter,
    customNextButtonName,
    showLogoHeader,
    goToNext,
    goToBack,
  };
};
