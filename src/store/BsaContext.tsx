import React from "react";
import { log } from "../services";
import { setPersistState, getPersistState } from "../utils/PersistState";
import { IState } from "./BsaContextType";

const defaultBsaValues = {};

const initialState = {
  results: defaultBsaValues,
};

/* Types for the reducer */
interface IAction {
  type: "update" | "reset";
  bsaQuestionnaire: any;
}

const reducer = (prevState: IState, action: IAction) => {
  switch (action.type) {
    case "update":
      return {
        ...prevState,
        results: action.bsaQuestionnaire,
      };
    case "reset":
      return {
        ...prevState,
        results: action.bsaQuestionnaire,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/* Types for the Context and Provider */
type IReducer = (prevState: IState, action: IAction) => IState;
type IDispatch = (action: IAction) => void;

const BsaDispatchContext = React.createContext<IDispatch | undefined>(
  undefined
);
const BsaStateContext = React.createContext<IState | undefined>(undefined);

interface IProviderProps {
  children: React.ReactNode;
}
const BsaProvider = ({ children }: IProviderProps) => {
  const [state, dispatch] = React.useReducer<IReducer>(
    reducer,
    getPersistState("BSA") || initialState
  );

  React.useEffect(() => {
    setPersistState("BSA", state);
  }, [state]);

  return (
    <BsaStateContext.Provider value={state}>
      <BsaDispatchContext.Provider value={dispatch}>
        {children}
      </BsaDispatchContext.Provider>
    </BsaStateContext.Provider>
  );
};

/* Declare our Hooks */
const useBsa = () => {
  const bsa = React.useContext(BsaStateContext);
  const dispatch = React.useContext(BsaDispatchContext);

  if (bsa === undefined || dispatch === undefined) {
    throw new Error("useBsa must be used within a BsaProvider");
  }

  const updateBsa = (bsaQuestionnaire: any) => {
    log.info("updating BSA questionnaire", "usebsa");
    return dispatch({ type: "update", bsaQuestionnaire });
  };
  const resetBsa = () => {
    log.info("resetting BSA questionnaire", "usebsa");
    const bsaQuestionnaire = defaultBsaValues;
    return dispatch({ type: "reset", bsaQuestionnaire });
  };

  return {
    bsa,
    dispatch,
    updateBsa,
    resetBsa,
  };
};

export { BsaProvider, useBsa };
