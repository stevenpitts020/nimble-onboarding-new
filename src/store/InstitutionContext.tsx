import React from "react";
import { IInstitution } from "../NimbleRouter";
import { IProps } from "./InstitutionContextType";

export const InstitutionContext = React.createContext<IInstitution | undefined>(
  undefined
);

export const InstitutionProvider: React.FC<IProps> = ({
  children,
  institution,
}) => (
  <InstitutionContext.Provider value={institution}>
    {children}
  </InstitutionContext.Provider>
);
