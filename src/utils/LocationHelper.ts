/**
 * This file contains basic location helpers to be reused in views or components
 *
 * Use it to DRY your code. Peace.
 * ex: Helpers.locationTitle('/onboarding');
 */

const locationTitles: { [pathname: string]: string } = {
  "/onboarding": "Intro Screen",
  "/onboarding/terms-and-conditions": "Terms and Conditions",
  "/onboarding/capture-documents": "Scan ID",
  "/onboarding/front": "Scan Front of ID",
  "/onboarding/back": "Scan Back of ID",
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
  "/onboarding/success": "Request Completed",
  "/onboarding/sign-contract": "Sign Contract",
  "/onboarding/": "Intro Screen",
  "/onboarding/privacy-policy": "Nimble Privacy Policy",
  "/onboarding/already-complete": "This Request was already submitted",
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
