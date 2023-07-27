import React from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../AlertDialog";
import { IAlertDialogButtons } from "../types";

const AlertDialogButtons = ({
  onCancel,
  onAction,
  className,
}: IAlertDialogButtons) => (
  <div
    className={`flex-spaced-horizontal u-justify-center space-x-8 ${className}`}
    data-testid="alert-dialog-buttons"
  >
    {onCancel && (
      <AlertDialogCancel data-testid="cancel-button" onClick={onCancel}>
        No
      </AlertDialogCancel>
    )}
    <AlertDialogAction data-testid="action-button" onClick={onAction}>
      Yes
    </AlertDialogAction>
  </div>
);

export default AlertDialogButtons;
