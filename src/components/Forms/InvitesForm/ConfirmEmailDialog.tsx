import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../Common/AlertDialog";
import { IConfirmEmailDialog } from "./types";

const ConfirmEmailDialog: FC<IConfirmEmailDialog> = (props) => (
  <AlertDialog open={props.isOpen}>
    <AlertDialogContent size="small" align="center">
      <div className="space-y-10">
        <AlertDialogTitle>
          Looks like you&apos;re inviting someone using your email.
        </AlertDialogTitle>

        <AlertDialogDescription className="ni-color-text">
          Please make sure that you are entering the email address of the
          account holder you wish to invite and not your own.
        </AlertDialogDescription>

        <AlertDialogDescription>
          <strong>Are you sure you want to use your email address?</strong>
        </AlertDialogDescription>

        <div className="flex-spaced-horizontal u-justify-center space-x-8">
          <AlertDialogCancel onClick={props.onCancel}>No</AlertDialogCancel>
          <AlertDialogAction onClick={props.onAction}>Yes</AlertDialogAction>
        </div>
      </div>
    </AlertDialogContent>
  </AlertDialog>
);
export default ConfirmEmailDialog;
