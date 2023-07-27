import React from "react";

export interface ITermsAndConditions {
  activeDisclosure: string;
  close?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
