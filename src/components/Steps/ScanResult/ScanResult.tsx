import React from "react";
import { useHistory } from "react-router-dom";
import ScanResultView from "./ScanResultView";
import flow from "../../../services/Flow";
import mockData from "./mockData";
import { LOCALE_STORAGE_KEY_FRONT_PHOTO } from "../../../utils/constants/general";

const ScanResult = () => {
  const history = useHistory();
  const { push } = history;

  const photo = sessionStorage.getItem(LOCALE_STORAGE_KEY_FRONT_PHOTO);

  const goToNextStep = () => {
    if (flow.isBuyNowPayLater()) {
      push("/onboarding/my-personal-income");
    } else if (flow.isMainOnboarding()) {
      push("/onboarding/second-co-applicant");
    } else {
      console.error("Unknown flow");
    }
  };

  return (
    <ScanResultView
      image={photo || ""}
      documentId={mockData.documentId}
      goToNextStep={goToNextStep}
    />
  );
};

export default ScanResult;
