import React from "react";
import Button from "../../Common/Button/Button";
import Logo from "../Logo/Logo";
import AlertDialogModal from "../../Common/AlertDialogModal/AlertDialogModal";
import { IExitLogoViewProps } from "./types";

const ExitLogoView: React.FC<IExitLogoViewProps> = ({
  props,
  institution,
  onOpenConfirmModal,
  isOpenConfirmModal,
  onCancelConfirmModal,
  onActionConfirmModal,
}) => {
  const { className } = props || {};
  return (
    <div data-testid="exit-logo" className={className}>
      <Button onClick={onOpenConfirmModal} className="p-0">
        <Logo
          url={institution?.logoUri?.default || ""}
          alt={`${institution?.name} logo`}
        />
      </Button>
      <AlertDialogModal
        isOpen={isOpenConfirmModal}
        onCancel={onCancelConfirmModal}
        onAction={onActionConfirmModal}
        title="Are you sure? This will start a new account opening process?"
      />
    </div>
  );
};

export default ExitLogoView;
