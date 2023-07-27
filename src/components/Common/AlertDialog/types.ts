import * as Polymorphic from "@radix-ui/react-polymorphic";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { ReactElement } from "react";

export type IPolymorphicDialogContent = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof AlertDialogPrimitive.Content>,
  Polymorphic.OwnProps<typeof AlertDialogPrimitive.Content> & {
    size?: "small";
    align?: "center" | "left";
    tone?: "none" | "warning";
  }
>;

export interface IAlertDialog {
  children?: React.ReactNode;
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?(open: boolean): void;
}

export interface IAlertDialogTitle {
  children?: React.ReactNode;
}

export interface IAlertDialogValue {
  size: string;
  align: string;
  tone: string;
  children: ReactElement;
  props: any;
}
