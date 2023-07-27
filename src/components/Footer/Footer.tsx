import React, { useCallback } from "react";
import FooterView from "./FooterView";
import { useLayoutContext } from "../../store/LayoutContext";
import useHotKey from "../../hooks/useHotKey";

const Footer: React.FC = () => {
  const {
    goToNext,
    goToBack,
    showNextButton,
    showBackButton,
    customNextButtonName,
    withoutEnter,
  } = useLayoutContext();
  const onHotKey = useCallback(
    (keysPressed, event) => {
      if (showNextButton && event.key === "Enter" && !withoutEnter) {
        goToNext();
      }
    },
    [goToNext, showNextButton]
  );
  useHotKey(onHotKey);

  return (
    <>
      {(showBackButton || showNextButton) && (
        <FooterView
          showBackButton={showBackButton}
          showNextButton={showNextButton}
          customNextButtonName={customNextButtonName}
          goToNext={goToNext}
          goToBack={goToBack}
        />
      )}
    </>
  );
};
export default Footer;
