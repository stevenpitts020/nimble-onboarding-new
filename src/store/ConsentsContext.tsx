import React from "react";
import { log } from "../services";
import { setPersistState, getPersistState } from "../utils/PersistState";
import { IState } from "./ConsentsContextType";

const initialState = {
  initial: false,
  terms: false,
  treatmentPhotos: false,
  privacyPolicy: false,
  communication: false,
};

/* Types for the reducer */
interface IAction {
  type: "update";
  payload: boolean;
  key: string;
}

const reducer = (prevState: IState, action: IAction) => {
  switch (action.type) {
    case "update":
      return {
        ...prevState,
        [action.key]: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/* Types for the Context and Provider */
type IReducer = (prevState: IState, action: IAction) => IState;
type IDispatch = (action: IAction) => void;

const ConsentDispatchContext = React.createContext<IDispatch | undefined>(
  undefined
);
const ConsentsStateContext = React.createContext<IState | undefined>(undefined);

interface IProviderProps {
  children: React.ReactNode;
}

const ConsentsProvider = ({ children }: IProviderProps) => {
  const [state, dispatch] = React.useReducer<IReducer>(
    reducer,
    getPersistState("CONSENTS") || initialState
  );

  React.useEffect(() => {
    setPersistState("CONSENTS", state);
  }, [state]);

  return (
    <ConsentsStateContext.Provider value={state}>
      <ConsentDispatchContext.Provider value={dispatch}>
        {children}
      </ConsentDispatchContext.Provider>
    </ConsentsStateContext.Provider>
  );
};

/* Declare our Hooks */
const useConsents = () => {
  const consents = React.useContext(ConsentsStateContext);
  const dispatch = React.useContext(ConsentDispatchContext);

  if (consents === undefined || dispatch === undefined) {
    throw new Error("useConsents must be used within a ConsentsProvider");
  }

  const updateConsent = (
    key:
      | "initial"
      | "terms"
      | "treatmentPhotos"
      | "privacyPolicy"
      | "communication",
    value: boolean
  ) => {
    log.info("updating consent", "useConsents");
    return dispatch({ type: "update", payload: value, key });
  };

  return {
    consents,
    dispatch,
    updateConsent,
  };
};

export { ConsentsProvider, useConsents };
