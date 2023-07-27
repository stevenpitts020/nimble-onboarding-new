import React, { FC, useContext, useEffect, useState } from "react";
import { InstitutionContext } from "../../../store/InstitutionContext";
import { UrlContext } from "../../../store/UrlContext";
import "./header.sass";
import { getExpiryTime, clearPersistState } from "../../../utils/PersistState";
import HeaderView from "./HeaderView";
import { IHeader } from "./types";

const Header: FC<IHeader> = (props) => {
  const institution = useContext(InstitutionContext);
  const { currentStep } = useContext(UrlContext);
  const stepsWithTimer = [
    "bsa-questionnaire",
    "invite-signers",
    "choose-amount",
    "choose-product-options",
    "choose-products",
    "personal-info",
    "selfie",
    "back",
    "front",
    "capture-documents",
    "terms-and-conditions",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [alertResult, setAlertResult] = useState(false);

  const twoDigits = (value: number): string => {
    let result;
    if (value >= 10) {
      result = `${value}`;
    } else {
      result = `0${value}`;
    }
    return result;
  };

  useEffect(() => {
    if (getExpiryTime() && alertResult) {
      clearPersistState();
      document.location.assign(
        `/${window.location.pathname.split("/")[1]}/onboarding`
      );
    } else {
      return undefined;
    }
  }, [alertResult]);

  const onCancel = () => {
    setIsOpen(false);
    setAlertResult(false);
  };
  const onAction = () => {
    setIsOpen(false);
    setAlertResult(true);
  };

  return (
    <HeaderView
      props={props}
      currentStep={currentStep}
      institution={institution}
      onGoToStart={() => setIsOpen(true)}
      stepsWithTimer={stepsWithTimer}
      twoDigits={twoDigits}
      isOpen={isOpen}
      onCancel={onCancel}
      onAction={onAction}
    />
  );
};
export default Header;
