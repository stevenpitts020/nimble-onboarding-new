import React from "react";
import * as Sentry from "@sentry/react";
import { document as documentService, log } from "../services";
import { setPersistState, getPersistState } from "../utils/PersistState";
import { AxiosError } from "axios";
import {
  IAction,
  IRejectAction,
  IResolveAction,
  IState,
} from "./DocumentsContextType";

/* Our state will have:
  status: like a state machine
  error: when there is a error message
  documents: hold our documents in state
*/

const initialState = {
  status: "idle",
  error: undefined,
  documents: {
    selfie: null,
    front: null,
    back: null,
  },
};

const reducer = (prevState: IState, action: IAction) => {
  switch (action.type) {
    case "create":
      return {
        ...prevState,
        status: "loading",
      };
    case "resolve":
      return {
        ...prevState,
        status: "success",
        documents: {
          ...prevState.documents,
          [(action as IResolveAction).subject]: (action as IResolveAction)
            .payload,
        },
        error: undefined,
      };
    case "reject":
      return {
        ...prevState,
        status: "failure",
        error: (action as IRejectAction).payload,
      };
    case "cancel":
      return {
        ...prevState,
        status: "idle",
        error: undefined,
      };
    case "reset":
      return {
        status: "idle",
        error: undefined,
        documents: {
          selfie: null,
          front: null,
          back: null,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/* Types for the Context and Provider */
type IReducer = (
  prevState: IState,
  action: IAction | IRejectAction | IResolveAction
) => IState;
type IDispatch = (action: IAction | IRejectAction | IResolveAction) => void;
interface IProviderProps {
  children: React.ReactNode;
  initialProviderState?: IState;
}

/* Note: exporting this because it's useful in tests */
export const DocumentStateContext = React.createContext<IState | undefined>(
  undefined
);
const DocumentDispatchContext = React.createContext<IDispatch | undefined>(
  undefined
);

const DocumentsProvider = (props: IProviderProps) => {
  const [state, dispatch] = React.useReducer<IReducer>(
    reducer,
    props.initialProviderState || getPersistState("DOCS") || initialState
  );

  React.useEffect(() => {
    setPersistState("DOCS", state);
  }, [state]);

  return (
    <DocumentStateContext.Provider value={state}>
      <DocumentDispatchContext.Provider value={dispatch}>
        {props.children}
      </DocumentDispatchContext.Provider>
    </DocumentStateContext.Provider>
  );
};

/* Declare our Hooks */
const useDocumentState = () => {
  const context = React.useContext(DocumentStateContext);
  if (context === undefined) {
    throw new Error("useDocumentState must be used within a DocumentProvider");
  }
  return context;
};

const useDocumentDispatch = () => {
  const context = React.useContext(DocumentDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useDocumentDispatch must be used within a DocumentProvider"
    );
  }
  return context;
};

/* This splits the string into an array of strings
 * with the first item (index 0) containing data:image/png;base64
 * and the second item (index 1) containing the base64 encoded data.
 * */
const parseDataURI = (dataURI: string) => dataURI?.split(",")[1];

/* Declare our helpers that make multiple changes to state */
const uploadDocument = async (
  dispatch: IDispatch,
  file: string,
  subject: "front" | "back" | "selfie",
  institutionId: string
) => {
  dispatch({ type: "create" });
  try {
    log.info(`Sending ${subject} document to server`, "uploadDocument");

    const uploadParams = {
      content: parseDataURI(file),
      format: "image",
      institutionId,
    };
    const createdDocument = await documentService.create(uploadParams);

    dispatch({ type: "resolve", subject, payload: { id: createdDocument.id } });
  } catch (error) {
    Sentry.captureException(error);
    log.error(error, "uploadDocument");
    dispatch({
      type: "reject",
      payload: documentService.errorMessage(error as AxiosError),
    });
  }
};

export {
  DocumentsProvider,
  useDocumentState,
  useDocumentDispatch,
  uploadDocument,
};
