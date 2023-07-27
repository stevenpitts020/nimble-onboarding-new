import { ReactChild } from "react";

export interface IProvider {
  children: ReactChild;
}

export interface ILoadingContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
