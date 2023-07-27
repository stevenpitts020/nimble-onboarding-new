import React, { useCallback, useContext, useEffect, useState } from "react";
import { IExitLogoProps } from "./types";
import ExitLogoView from "./ExitLogoView";
import { InstitutionContext } from "../../../store";
import { clearPersistState, getExpiryTime } from "../../../utils/PersistState";

const ExitLogo: React.FC<IExitLogoProps> = (props) => {
  const institution = useContext(InstitutionContext);

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [alertResult, setAlertResult] = useState(false);

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

  const onCancelConfirmModal = useCallback(() => {
    setIsOpenConfirmModal(false);
    setAlertResult(false);
  }, []);

  const onActionConfirmModal = useCallback(() => {
    setIsOpenConfirmModal(false);
    setAlertResult(true);
  }, []);

  const onOpenConfirmModal = useCallback(() => setIsOpenConfirmModal(true), []);

  return (
    <ExitLogoView
      props={props}
      institution={institution}
      isOpenConfirmModal={isOpenConfirmModal}
      onOpenConfirmModal={onOpenConfirmModal}
      onCancelConfirmModal={onCancelConfirmModal}
      onActionConfirmModal={onActionConfirmModal}
    />
  );
};

export default ExitLogo;
