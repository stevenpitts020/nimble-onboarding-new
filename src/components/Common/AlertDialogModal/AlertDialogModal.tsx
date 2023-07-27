import React from "react";
import { IAlertDialogModal } from "./types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "../AlertDialog";
import AlertDialogButtons from "./components/AlertDialogButtons";

const AlertDialogModal = ({
  isOpen,
  onCancel,
  onAction,
  title,
  className,
}: IAlertDialogModal) => (
  <div data-testid="alert-dialog-modal" className={className}>
    <AlertDialog open={isOpen}>
      <AlertDialogContent size="small" align="center">
        <div className="space-y-10">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogButtons onCancel={onCancel} onAction={onAction} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);

export default AlertDialogModal;
