import React from "react";

export interface Ibutton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: true;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  children?: React.ReactNode;
}
