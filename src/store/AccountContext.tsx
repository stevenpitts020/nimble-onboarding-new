import React, { useCallback, useContext, useState } from "react";
import { IAccountContext, IProps } from "./AccountContextType";

const initialAccountContext = {
  accountType: "",
  subItem: "",
  updateSubItem: () => {},
  updateAccountType: () => {},
};

const AccountContext = React.createContext<IAccountContext>(
  initialAccountContext
);

export const AccountProvider: React.FC<IProps> = ({ children }) => {
  const [accountType, setAccountType] = useState("");
  const [subItem, setSubItem] = useState("");

  const updateAccountType = useCallback((newAccountType) => {
    setAccountType(newAccountType);
    sessionStorage.setItem("AccountType", newAccountType);
  }, []);

  const updateSubItem = useCallback((newSubItem) => {
    setSubItem(newSubItem);
    sessionStorage.setItem("subItem", newSubItem);
  }, []);

  return (
    <AccountContext.Provider
      value={{ accountType, subItem, updateSubItem, updateAccountType }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountContext");
  }
  return context;
};
