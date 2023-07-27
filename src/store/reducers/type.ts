import { TSignerRole } from "../../components/Steps/StepInvites/constants";

export interface IProduct {
  id: string;
  name: string;
  category: string;
  summary: string;
  content: string;
  options: IProductOption[];
}

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
  // category: string
  initialDeposit?: number;
  options: IProductOption[];
}
export interface IProspectState {
  status: string;
  error: string | undefined | null;
  signer: ISignerDetails;
  invitees: IInvitedSigner[];
  products: IProductConfiguration[];
  accountRequestId?: string;
  signerId?: string;
  securityToken?: string;
  // TODO: deprecate selectedProductName, use product instead.
  selectedProductName?: string | undefined;
  // TODO: save products[], products[] in a different context provider
  selectedProduct?: IProduct;
  invitedBy?: IInvitedBy;
  inviteeToken?: string;
  tokens?: ITokensById[];
}

export interface IInvitedBy {
  firstName: string;
  email: string;
  id: string;
}

export interface ISignerDetails {
  id?: string;
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  phoneNumber: string | undefined;
  email: string | undefined;
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zipCode: string | undefined;
  employer: string | undefined;
  ssn: string | undefined;
  documentType: string | undefined;
  documentNumber: string | undefined;
  documentExpirationDate: string | undefined;
  documentIssuedDate: string | undefined;
  documentIssuer: string | undefined;
  selfieDocumentId: string | undefined;
  consent: boolean | undefined;
  securityToken?: string | undefined;
  validated?: boolean;
}

export interface IInvitedSigner {
  id?: string;
  email: string;
  role?: TSignerRole;
}

export interface IAction {
  type: string;
  payload?: ISignerDetails;
  error?: string | undefined;
  status?: string;
  accountRequestId?: string;
  signerId?: string;
  productId?: string;
  product?: IProduct;
  productName?: string;
  securityToken?: string;
  initialDeposit?: number;
  productOptions?: IProductOption[];
  invitedBy?: IInvitedBy;
  tokens?: ITokensById[];
}

interface IActionWithPayload {
  type: string;
  payload: ISignerDetails | IInvitedSigner[] | boolean;
  error?: string | undefined;
  status?: string;
}

interface ITokensById {
  id: string;
  token: string;
}
/* Initial state for reducer */
export const initialState: IProspectState = {
  error: null,
  status: "idle",
  signer: {
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
    dateOfBirth: undefined,
    phoneNumber: undefined,
    email: undefined,
    address: undefined,
    city: undefined,
    state: undefined,
    zipCode: undefined,
    employer: undefined,
    ssn: undefined,
    documentType: "USDL",
    documentNumber: undefined,
    documentExpirationDate: undefined,
    documentIssuedDate: undefined,
    selfieDocumentId: undefined,
    consent: undefined,
    documentIssuer: undefined,
    securityToken: undefined,
    validated: false,
  },
  tokens: [],
  products: [],
  invitees: [],
  invitedBy: undefined,
  accountRequestId: undefined,
};

export type IReducer = (
  prevState: IProspectState,
  action: IAction | IActionWithPayload
) => IProspectState;
