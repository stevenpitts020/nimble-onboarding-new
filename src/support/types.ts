/* define everything that can be overwritten in state */
import { IDocuments } from "../store/DocumentsContextType";
import { IInstitution } from "../NimbleRouter";
import {
  IInvitedSigner,
  IProductConfiguration,
  ISignerDetails,
} from "../store/reducers/type";

export interface IOnboardingHelper {
  documentProviderProps: {
    status?: string;
    documents?: IDocuments;
  };
  institutionProviderProps: {
    institution?: IInstitution;
  };
  prospectProviderProps: {
    status?: string;
    signer?: ISignerDetails;
    invitees?: IInvitedSigner[];
    products?: IProductConfiguration[];
    error?: string | undefined;
  };
}
