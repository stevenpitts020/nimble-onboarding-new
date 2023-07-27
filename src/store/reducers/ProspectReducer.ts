/* interface for state */
import {
  IAction,
  IInvitedSigner,
  initialState,
  IProductConfiguration,
  IReducer,
  ISignerDetails,
} from "./type";

const reducer: IReducer = (state, action) => {
  switch (action.type) {
    case "updatePersonalInfo": {
      const signer = action.payload as ISignerDetails;
      return {
        ...state,
        signer,
        status: "signerReady",
        error: null,
      };
    }
    case "finish":
      return { ...state, status: "success", error: null };
    case "createEmbedView":
      return { ...state, status: "embedReady" };
    case "reset":
      return initialState;
    case "updateSignerValidation": {
      const updatedSigner = {
        ...state.signer,
        validated: action.payload,
      } as ISignerDetails;
      return { ...state, signer: updatedSigner };
    }
    case "updateProspectSigner":
      return {
        ...state,
        accountRequestId: (action as IAction).accountRequestId,
        signerId: (action as IAction).signerId,
        securityToken: (action as IAction).securityToken,
        tokens: (state.tokens || []).concat((action as IAction).tokens || []),
      };
    case "resetBrokenAccountRequest":
      return {
        ...state,
        accountRequestId: undefined,
        signerId: undefined,
        securityToken: undefined,
        tokens: [],
      };
    case "updateInvitedBy":
      return {
        ...state,
        invitedBy: (action as IAction).invitedBy,
      };
    case "error":
      return {
        ...state,
        status: "failure",
        error: action.error,
      };
    case "invitees": {
      const invitees = action.payload as IInvitedSigner[];
      return { ...state, invitees };
    }
    case "updateInitialDeposit": {
      const chosenProduct = state.products[0];
      // just in case we dont have a product
      if (!chosenProduct) {
        return state;
      }
      return {
        ...state,
        products: [
          {
            ...chosenProduct,
            initialDeposit: (action as IAction).initialDeposit,
          },
        ],
      };
    }
    case "addProduct": {
      const productConfiguration = {
        initialDeposit:
          (action as IAction).product?.category === "LOAN" ||
          (action as IAction).product?.category === "CARD"
            ? undefined
            : 100,
        // category: (action as IAction).product?.category,
        productId: (action as IAction).product?.id,
        options: [], // this will be set in another PR
      } as IProductConfiguration;

      return {
        ...state,
        products: [productConfiguration],
        selectedProductName: (action as IAction).product?.name,
        selectedProduct: (action as IAction).product,
      };
    }
    case "updateProductOptions": {
      const selectedProduct = state.products[0];
      const options = (action as IAction).productOptions;
      if (!options) {
        return state;
      }
      return {
        ...state,
        products: [{ ...selectedProduct, options }],
      };
    }
    default:
      return state;
  }
};
export default reducer;
