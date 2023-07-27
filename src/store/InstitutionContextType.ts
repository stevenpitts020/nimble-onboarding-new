import React from "react";
import { IInstitution } from "../NimbleRouter";

export interface IProps {
  institution?: IInstitution;
  children: React.ReactNode;
}
