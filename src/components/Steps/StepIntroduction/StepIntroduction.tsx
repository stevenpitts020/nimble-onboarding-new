import React from "react";
import StepIntroductionView from "./StepIntroductionView";
import { useLayout } from "../../../store/LayoutContext";
import { useHistory } from "react-router-dom";
import "./StepIntroduction.sass";

const StepIntroduction = () => {
  const history = useHistory();

  const goToNext = () => {
    history.push("/onboarding/capture-documents");
  };

  useLayout({ goToNext });

  return <StepIntroductionView goToNext={goToNext} />;
};

export default StepIntroduction;
