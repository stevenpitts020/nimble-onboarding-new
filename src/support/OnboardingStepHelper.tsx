import React from "react";
import { Switch } from "react-router-dom";
import {
  InstitutionContext,
  ProspectProvider,
  LoadingProvider,
  ConsentsProvider,
  BsaProvider,
  useLoading,
  DocumentsProvider,
} from "../store";

import { validSigner } from "../services/__mocks__/Signer";
import { mockInstitution } from "../services/__mocks__/Institution";
import { UrlProvider } from "../store/UrlContext";

import { IOnboardingHelper } from "./types";
import Loading from "../components/Common/Loading/Loading";
import { initialState } from "../store/reducers/type";

const OnboardingStepHelper = (props: {
  providerProps: IOnboardingHelper;
  children: React.ReactNode;
}) => {
  const { providerProps, children } = props;

  // defaults for prospect state
  const prospectProps = {
    ...initialState,
    signer: validSigner, // add a default valid signer
    ...providerProps.prospectProviderProps,
  };
  const institutionProps = {
    ...mockInstitution,
    ...providerProps.institutionProviderProps?.institution,
  };
  const documentProps = {
    status: "idle",
    documents: {
      selfie: { id: "somefrontid", file: "somefrontfile" },
      front: { id: "somefrontid", file: "somefrontfile" },
      back: { id: "somebackid", file: "somebackfile" },
    },
    ...providerProps.documentProviderProps,
  };
  const { loading } = useLoading();

  return (
    <UrlProvider>
      <InstitutionContext.Provider value={institutionProps}>
        <ProspectProvider initialProviderState={prospectProps}>
          <DocumentsProvider initialProviderState={documentProps}>
            <LoadingProvider>
              <ConsentsProvider>
                <BsaProvider>
                  <Loading fullPage active={loading} />
                  <Switch>{children}</Switch>
                </BsaProvider>
              </ConsentsProvider>
            </LoadingProvider>
          </DocumentsProvider>
        </ProspectProvider>
      </InstitutionContext.Provider>
    </UrlProvider>
  );
};
export default OnboardingStepHelper;
