import React from "react";
import { useHistory } from "react-router-dom";
import StepSelectDocumentView from "./StepSelectDocumentView";

const StepSelectDocument: React.FC = () => {
  const history = useHistory();

  const onClickNext = (selectedDocument) => {
    history.push(`/onboarding/front?camera-active&${selectedDocument}`);
  };

  return <StepSelectDocumentView onChooseDocument={onClickNext} />;
};

export default StepSelectDocument;
