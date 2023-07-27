import React, { FC, useEffect, useReducer, createContext } from "react";
import { setPersistState, getPersistState } from "../../utils/PersistState";
import { reducer } from "./reducer";
import { IProvider, ITermLoan } from "./types";
import { SET_ACTIVE_ITEM, TOGGLE_DROPDOWN_VISIBILITY } from "./actionTypes";
import mockData from "./mockData";

// Localstorage key
const TERM_LOAN = "TERM_LOAN";

const initialState = {
  termLoanItems: [
    {
      name: "Revenue",
      valuesRange: [50000, 150000, 300000, 450000, 600000],
      value: 0,
    },
    {
      name: "Current Debt Outstanding",
      valuesRange: [250000, 750000, 1500000, 3000000, 6000000],
      value: 0,
    },
    {
      name: "Debt Obligations",
      addText: "(Monthly Basis)",
      valuesRange: [0, 50000, 100000, 200000, 300000],
      value: 0,
    },
  ],
  termLoanPickerItems: mockData,
  activeItem: mockData[0],
  isShowDropdown: false,
};

export const TermLoanContext = createContext({} as ITermLoan);

export const TermLoanProvider: FC<IProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    getPersistState(TERM_LOAN) || initialState
  );

  useEffect(() => {
    setPersistState(TERM_LOAN, state);
  }, [state]);

  const setActiveItem = (item: ITermLoan["activeItem"]) => {
    dispatch({ type: SET_ACTIVE_ITEM, payload: item });
  };

  const toggleDropdownVisibility = (value: boolean) => {
    dispatch({ type: TOGGLE_DROPDOWN_VISIBILITY, payload: value });
  };

  return (
    <TermLoanContext.Provider
      value={{
        termLoanItems: state.termLoanItems,
        termLoanPickerItems: state.termLoanPickerItems,
        activeItem: state.activeItem,
        isShowDropdown: state.isShowDropdown,
        setActiveItem: setActiveItem,
        toggleDropdownVisibility: toggleDropdownVisibility,
      }}
    >
      {children}
    </TermLoanContext.Provider>
  );
};
