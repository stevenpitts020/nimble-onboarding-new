import { ReactChild } from "react";
import { ISigner } from "../services/types";
import { IDocuments } from "./DocumentsContextType";
import { IConsents } from "./ConsentsContextType";
import {
  IInvitedSigner,
  IProduct,
  IProductOption,
  IProspectState,
  ISignerDetails,
} from "./reducers/type";

export interface IProps {
  signer: ISignerDetails;
  institutionId: string;
  documents: IDocuments;
  accountRequestId?: string;
  signerId?: string;
  invitees?: IInvitedSigner[];
  product?: { initialDeposit?: number };
  selectedProduct?: IProduct;
  consents: IConsents;
  bsa: any;
}

export interface IProvider {
  children: ReactChild;
  initialProviderState?: IProspectState;
}
export interface IAccountRequest {
  id?: string;
  institutionId: string;
  status?: string;
  bsa?: any[];
  signers?: ISigner[];
  productConfigurations?: IProductOption[];
}
export interface IIdProofDocument {
  number: string;
  expirationDate: string;
  issuedDate: string;
  frontDocumentId: string;
  backDocumentId?: string;
  issuer: string;
}

export interface IInviteData {
  accountRequestId: string;
  signerId: string;
  inviteeToken: string;
}
enum BackendValidatedSignerProperties {
  ssn = "ssn",
  phoneNumber = "phoneNumber",
}
export interface IValidationErrorDetails {
  message: string;
}
type ValidationErrorDetails = Record<
  BackendValidatedSignerProperties,
  IValidationErrorDetails
>;
export interface IValidationErrors {
  [key: string]: ValidationErrorDetails;
}
export interface IProspectContext {
  prospect: IProspectState;
  addInvitee: (data: IInviteData) => void;
  validateSigner: (data: ISignerDetails) => void;
  updateSigner: (data: ISignerDetails) => void;
  sendDataToServer: (
    institutionId: string,
    documents: IDocuments,
    consents: IConsents,
    bsa: any
  ) => void;
  populateProspectWithFields: (
    licenceFrontId: string,
    licenseBackId: string
  ) => void;
  setInvitees: (invitees: IInvitedSigner[]) => void;
  resetProspect: () => void;
  finishProspect: () => void;
  addProduct: (product: IProduct) => void;
  updateInitialDeposit: (initialDeposit: number) => void;
  updateProductOptions: (options: IProductOption[]) => void;
  setError: (message: string) => void;
  cleanSignerInformation: () => void;
}

export interface IProofDocument {
  type: string | number | undefined;
  number: string;
  expirationDate: string;
  issuedDate: string;
  issuer: string;
  frontDocumentId: string;
  backDocumentId?: string;
}
