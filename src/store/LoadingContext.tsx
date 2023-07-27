import React, { FC } from "react";
import { ILoadingContext, IProvider } from "./LoadingContextType";

export const LoadingContext = React.createContext({} as ILoadingContext);

export const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider: FC<IProvider> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
