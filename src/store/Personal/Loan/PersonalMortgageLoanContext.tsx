import React from "react";
import { log } from "../../../services";
import { setPersistState, getPersistState } from "../../../utils/PersistState";
import { IPersonalMortgageLoanQuestionnaire, IState } from "./types";

const defaultPersonalMortgageLoanValues: IPersonalMortgageLoanQuestionnaire = {
  // TODO: WIP below
  purposeOfLoan: "Purchase",
  mortgageType: "Conventional",
  amortizationType: "Fixed Rate",
  propertyAddressStreet: undefined,
  propertyAddressCity: undefined,
  propertyAddressState: undefined,
  propertyAddressZip: undefined,
  usageOfProperty: "Primary Residence",
  purchasePrice: undefined,
};
const initialState = {
  results: defaultPersonalMortgageLoanValues,
};

/* Types for the reducer */
interface IAction {
  type: "update" | "reset";
  personalMortgageLoanQuestionnaire: IPersonalMortgageLoanQuestionnaire;
}

const reducer = (prevState: IState, action: IAction) => {
  switch (action.type) {
    case "update":
      return {
        ...prevState,
        results: action.personalMortgageLoanQuestionnaire,
      };
    case "reset":
      return {
        ...prevState,
        results: action.personalMortgageLoanQuestionnaire,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/* Types for the Context and Provider */
type IReducer = (prevState: IState, action: IAction) => IState;
type IDispatch = (action: IAction) => void;

const PersonalMortgageLoanDispatchContext = React.createContext<
  IDispatch | undefined
>(undefined);
const PersonalMortgageLoanStateContext = React.createContext<
  IState | undefined
>(undefined);

interface IProviderProps {
  children: React.ReactNode;
}
const PersonalMortgageLoanProvider = ({ children }: IProviderProps) => {
  const [state, dispatch] = React.useReducer<IReducer>(
    reducer,
    getPersistState("PersonalMortgageLoan") || initialState
  );

  React.useEffect(() => {
    setPersistState("PersonalMortgageLoan", state);
  }, [state]);

  return (
    <PersonalMortgageLoanStateContext.Provider value={state}>
      <PersonalMortgageLoanDispatchContext.Provider value={dispatch}>
        {children}
      </PersonalMortgageLoanDispatchContext.Provider>
    </PersonalMortgageLoanStateContext.Provider>
  );
};

/* Declare our Hooks */
const usePersonalMortgageLoan = () => {
  const personalMortgageLoan = React.useContext(
    PersonalMortgageLoanStateContext
  );
  const dispatch = React.useContext(PersonalMortgageLoanDispatchContext);

  if (personalMortgageLoan === undefined || dispatch === undefined) {
    throw new Error(
      "usePersonalMortgageLoan must be used within a PersonalMortgageLoanProvider"
    );
  }

  const updatePersonalMortgageLoanQuestionnaire = (
    personalMortgageLoanQuestionnaire: IPersonalMortgageLoanQuestionnaire
  ) => {
    log.info(
      "updating PersonalMortgageLoan questionnaire",
      "usePersonalMortgageLoan"
    );
    return dispatch({ type: "update", personalMortgageLoanQuestionnaire });
  };
  const resetPersonalMortgageLoanQuestionnaire = () => {
    log.info(
      "resetting PersonalMortgageLoan questionnaire",
      "usePersonalMortgageLoan"
    );
    const personalMortgageLoanQuestionnaire = defaultPersonalMortgageLoanValues;
    return dispatch({ type: "reset", personalMortgageLoanQuestionnaire });
  };

  return {
    personalMortgageLoan,
    dispatch,
    updatePersonalMortgageLoanQuestionnaire,
    resetPersonalMortgageLoanQuestionnaire,
  };
};

export { PersonalMortgageLoanProvider, usePersonalMortgageLoan };
