import { IIdProofDocument } from "../store/ProspectContextType";

export interface IProductOption {
  id?: string;
  annotation?: string;
  key: string;
  value: string;
  category: string;
  title: string;
  lead?: string;
  parentId?: string;
}
export interface IProductConfiguration {
  productId: string;
  initialDeposit?: number;
  options: IProductOption[];
}

export interface IAccountRequest {
  institutionId: string;
  referredById?: string;
  productConfigurations: IProductConfiguration[];
  branchId?: string;
}
export interface ILoanConfig {
  enabled: boolean;
  products: string[];
}

export interface ICardConfig {
  enabled: boolean;
  products: string[];
}

export interface IFeatureConfig {
  loans: ILoanConfig;
  cards: ICardConfig;
}
export interface IDocument {
  content: string;
  format: string;
  institutionId: string;
}
export interface IColours {
  [key: string]: string;
}
export interface ISigner {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  role: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  employer?: string;
  ssn?: string;
  email?: string;
  dateOfBirth?: string;
  consent?: boolean;
  consentAccountOpening?: boolean;
  consentPrivacyPolicy?: boolean;
  consentCommunication?: boolean;
  idProofDocument?: IIdProofDocument;
  selfieDocumentId?: string;
  accountRequestId?: string;
  securityToken?: string;
}

export interface IVerifyEmail {
  signerId: string;
  token: string | null;
}
