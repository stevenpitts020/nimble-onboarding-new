import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { magicStrings } from "../utils/constants/magicStrings";
import { IProvider, IUrlContext } from "./UrlContextType";

export const UrlContext = React.createContext({} as IUrlContext);

export const UrlProvider: React.FC<IProvider> = ({ children }) => {
  // getting onboarding url
  const { pathname, search } = useLocation();
  let currentStep = pathname.substring(pathname.lastIndexOf("/") + 1);
  if (
    pathname === "/onboarding" ||
    pathname === "/onboarding/" ||
    pathname.includes("/signers/")
  ) {
    currentStep = "intro";
  }

  // getting search params
  const searchParams = new URLSearchParams(search);
  const isInvitedByName = searchParams.get("name");
  const inviteeToken = searchParams.get("token");
  const referredById = searchParams.get(
    magicStrings.urlSearchParams.referredById
  );

  useEffect(() => {
    if (referredById) {
      sessionStorage.setItem(magicStrings.props.referredById, referredById);
    }

    // save startUrl on first page
    const startUrl = sessionStorage.getItem("startUrl");
    if (currentStep === "intro" && !startUrl) {
      sessionStorage.setItem("startUrl", pathname);

      // if it is Invitee who is going through onboarding
      //  we save search param name and token to session storage
      const isInviteeOnboarding = pathname.includes("signers");
      if (isInviteeOnboarding) {
        if (isInvitedByName && inviteeToken) {
          sessionStorage.setItem("isInvitedByName", isInvitedByName);
          sessionStorage.setItem("inviteeToken", inviteeToken);
        }
      }
    }
  }, [inviteeToken, isInvitedByName, referredById, pathname, currentStep]);

  return (
    <UrlContext.Provider
      value={{
        inviteeToken: inviteeToken ? sanitizeUrl(inviteeToken) : null,
        isInvitedByName: isInvitedByName ? sanitizeUrl(isInvitedByName) : null,
        currentStep: sanitizeUrl(currentStep),
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};
