/* eslint-disable no-useless-computed-key */
import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  ProspectProvider,
  DocumentsProvider,
  ConsentsProvider,
  BsaProvider,
} from "../../store";
import "./Onboarding.sass";
import UrlStateManager from "./UrlStateManager";
import ScrollRestoration from "../ScrollRestoration/ScrollRestoration";
import StepInstructionsInvitees from "../Steps/StepInstructionsInvitees/StepInstructionsInvitees";
import StepPersonalMortgageLoanQuestionnaire from "../Steps/Personal/Loan/StepPersonalMortgageLoanQuestionnaire";
import { PersonalMortgageLoanProvider } from "../../store/Personal/Loan/PersonalMortgageLoanContext";
import { IOnboarding } from "./types";
import StepBackDocument from "../Steps/StepBack/StepBackDocument";
import StepOnboardingComplete from "../Steps/StepOnboardingComplete/StepOnboardingComplete";
import StepSuccess from "../Steps/StepSuccess/StepSuccess";
import StepInvites from "../Steps/StepInvites/StepInvites";
import StepVerifyEmail from "../Steps/StepVerifyEmail/StepVerifyEmail";
import StepTermsAndConditions from "../Steps/StepTermsAndConditions/StepTermsAndConditions";
import StepSelfie from "../Steps/StepSelfie/StepSelfie";
import StepBSAQuestionnaire from "../Steps/StepBSAQuestionnaire/StepBSAQuestionnaire";
import PrivacyPolicy from "../Legal/PrivacyPolicy/PrivacyPolicy";
import StepCaptureDocuments from "../Steps/StepCaptureDocuments/StepCaptureDocuments";
import StepChooseAmount from "../Steps/StepChooseAmount/StepChooseAmount";
import StepInstructions from "../Steps/StepInstructions/StepInstructions";
import StepOnboardOthers from "../Steps/StepOnboardOthers/StepOnboardOthers";
import StepFrontDocument from "../Steps/StepFront/StepFrontDocument";
import StepChooseProducts from "../Steps/StepChooseProducts/StepChooseProducts";
import StepChooseProductOptions from "../Steps/StepChooseProductOptions/StepChooseProductOptions";
import StepPersonalInfo from "../Steps/StepPersonalInfo/StepPersonalInfo";
import StepSignContract from "../Steps/StepSignContract/StepSignContract";

const Onboarding: React.FC<IOnboarding> = () => (
  <div data-testid="onboarding" className="mainContainer_wrapper">
    <div className="mainContainer">
      <ProspectProvider>
        <DocumentsProvider>
          <ConsentsProvider>
            <BsaProvider>
              <PersonalMortgageLoanProvider>
                <UrlStateManager />
                <ScrollRestoration />
                <Switch>
                  <Route path="/onboarding/terms-and-conditions">
                    <StepTermsAndConditions />
                  </Route>
                  <Route path="/onboarding/capture-documents">
                    <StepCaptureDocuments />
                  </Route>
                  <Route path="/onboarding/front">
                    <StepFrontDocument />
                  </Route>
                  <Route path="/onboarding/back">
                    <StepBackDocument />
                  </Route>
                  <Route path="/onboarding/selfie">
                    <StepSelfie />
                  </Route>
                  <Route path="/onboarding/personal-info">
                    <StepPersonalInfo />
                  </Route>
                  <Route path="/onboarding/choose-products">
                    <StepChooseProducts />
                  </Route>
                  <Route path="/onboarding/choose-product-options">
                    <StepChooseProductOptions />
                  </Route>
                  <Route path="/onboarding/personal-mortgage-loan-configuration">
                    <StepPersonalMortgageLoanQuestionnaire />
                  </Route>
                  <Route path="/onboarding/choose-amount">
                    <StepChooseAmount />
                  </Route>
                  <Route path="/onboarding/invite-signers">
                    <StepInvites maxInvitees={3} />
                  </Route>
                  <Route path="/onboarding/bsa-questionnaire">
                    <StepBSAQuestionnaire />
                  </Route>
                  <Route path="/onboarding/other-applicants">
                    <StepOnboardOthers />
                  </Route>
                  <Route path="/onboarding/verify-email">
                    <StepVerifyEmail />
                  </Route>
                  <Route path="/onboarding/success">
                    <StepSuccess />
                  </Route>
                  <Route path="/onboarding/sign-contract">
                    <StepSignContract />
                  </Route>
                  <Route path="/onboarding/:accountRequestId/signers/:signerId">
                    <StepInstructionsInvitees />
                  </Route>
                  <Route path="/onboarding/privacy-policy">
                    <PrivacyPolicy />
                  </Route>
                  <Route path="/onboarding/already-complete">
                    <StepOnboardingComplete />
                  </Route>
                  {/* if no route matches go to step 1 */}
                  <Route path="*">
                    <StepInstructions />
                  </Route>
                </Switch>
              </PersonalMortgageLoanProvider>
            </BsaProvider>
          </ConsentsProvider>
        </DocumentsProvider>
      </ProspectProvider>
    </div>
  </div>
);
export default Onboarding;
