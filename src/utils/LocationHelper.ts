/**
 * This file contains basic location helpers to be reused in views or components
 *
 * Use it to DRY your code. Peace.
 * ex: Helpers.locationTitle('/onboarding');
 */

const locationTitles: { [pathname: string]: string } = {
  "/login": "New Banking Request",
  "/verify-code": "Verify code",
  "/onboarding": "Phone number",
  "/onboarding/verify-number": "Auth code",
  "/onboarding/authentication-email": "Email",
  "/onboarding/business-or-personal": "Product Selection",
  "/onboarding/select-document": "Gov ID selection",
  "/onboarding/terms-and-conditions": "Disclosure",
  "/onboarding/capture-documents": "Scan ID",
  "/onboarding/front": "GovID: front",
  "/onboarding/back": "GovID: back",
  "/onboarding/scan-result": "GovID: confirm",
  "/onboarding/second-co-applicant": "Invite Others",
  "/onboarding/business-ein": "Business Applying",
  "/onboarding/business-ein-second": "Business Applying",
  "/onboarding/business-ein-third": "Business Applying",
  "/onboarding/company-information": "Company Information",
  "/onboarding/company-information-parent": "Company Information Parent",
  "/onboarding/term-loan": "Term loan",
  "/onboarding/term-loan-picker": "Term loan picker",
  "/onboarding/document-agreement": "Document agreement",
  "/onboarding/selfie": "Face Verification",
  "/onboarding/personal-info": "Personal Info",
  "/onboarding/choose-products": "Select a Product",
  "/onboarding/choose-product-options": "Choose Additional Features",
  "/onboarding/choose-amount": "Choose Initial Deposit",
  "/onboarding/invite-signers": "Invite Signers",
  "/onboarding/bsa-questionnaire": "BSA Questionnaire",
  "/onboarding/other-applicants": "Onboard other Signers",
  "/onboarding/verify-email": "Verify Email Address",
  "/email-verification/": "Verify Email Address",
  "/onboarding/": "Intro Screen",
  "/onboarding/success": "Request Completed",
  "/onboarding/sign-contract": "Sign Contract",
  "/onboarding/privacy-policy": "Nimble Privacy Policy",
  "/onboarding/already-complete": "This Request was already submitted",
  "/business-applicant": "Business Applicant",
  "/required-contact": "Required Contact",
  "/product-request": "Product Request",
  "/product-selection": "Product Selection",
  "/loan-application": "Loan Application",
  "/deposit-application": "Deposit Application",
  "/id-card": "ID Card",
};

const LocationHelper = {
  /** get location title */
  getLocationTitle: (location: string | null) => {
    if (location == null) {
      return "Nimble Page Not Found";
    }
    // this means there are tokens in the url
    // and the screen is outside of the 'normal' flow
    // e.g. localhost:3000/wearesingular.com/email-verification/
    if (locationTitles[location] === undefined) {
      const splitLocation = location.split("/");
      const newLocation = `/${splitLocation[1]}/`;
      return locationTitles[newLocation];
    }
    return locationTitles[location];
  },
};

export default LocationHelper;
