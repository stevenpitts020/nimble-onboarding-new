import React, { FC, useEffect, useReducer, createContext } from "react";
import { IPersonalInfo, IProvider } from "./types";
import { setPersistState, getPersistState } from "../../utils/PersistState";
import { reducer } from "./reducer";
import { CHANGE_PERSONAL_INFO } from "./actionTypes";
import PERSONAL_INFO_DATA from "./PERSONAL_INFO_DATA";

// Localstorage key
const PERSONAL_INFO = "PERSONAL_INFO";

const initialState = {
  personalInfo: PERSONAL_INFO_DATA,
};

export const PersonalInfoContext = createContext({} as IPersonalInfo);

export const PersonalInfoProvider: FC<IProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    getPersistState(PERSONAL_INFO) || initialState
  );

  useEffect(() => {
    setPersistState(PERSONAL_INFO, state);
  }, [state]);

  const onChangePersonalDetailsHandler = (key, value) => {
    dispatch({ type: CHANGE_PERSONAL_INFO, payload: { key, value } });
  };

  return (
    <PersonalInfoContext.Provider
      value={{
        personalInfo: state.personalInfo,
        onChangePersonalDetailsHandler,
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};
