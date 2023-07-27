import React from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";

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
import { TermLoanProvider } from "../../store/TermLoan/TermLoadContext";
import { IOnboarding } from "./types";
import StepOnboardingComplete from "../Steps/StepOnboardingComplete/StepOnboardingComplete";
import StepSuccess from "../Steps/StepSuccess/StepSuccess";
import StepVerifyEmail from "../Steps/StepVerifyEmail/StepVerifyEmail";
import StepTermsAndConditions from "../Steps/StepTermsAndConditions/StepTermsAndConditions";
import StepSelfie from "../Steps/StepSelfie/StepSelfie";
import StepBSAQuestionnaire from "../Steps/StepBSAQuestionnaire/StepBSAQuestionnaire";
import PrivacyPolicy from "../Legal/PrivacyPolicy/PrivacyPolicy";
import StepCaptureDocuments from "../Steps/StepCaptureDocuments/StepCaptureDocuments";
import StepChooseAmount from "../Steps/StepChooseAmount/StepChooseAmount";
import StepOnboardOthers from "../Steps/StepOnboardOthers/StepOnboardOthers";
import StepFrontDocument from "../Steps/StepFront/StepFrontDocument";
import StepChooseProducts from "../Steps/StepChooseProducts/StepChooseProducts";
import StepChooseProductOptions from "../Steps/StepChooseProductOptions/StepChooseProductOptions";
import StepPersonalInfo from "../Steps/StepPersonalInfo/StepPersonalInfo";
import StepSignContract from "../Steps/StepSignContract/StepSignContract";
import StepBusinessOrPersonal from "../Steps/StepBusinessOrPersonal/StepBusinessOrPersonal";
import StepAuthenticationPhone from "../Steps/StepAuthenticationPhone/StepAuthenticationPhone";
import StepAuthenticationEmail from "../Steps/NewStepAuthenticationEmail/StepAuthenticationEmail";
import NewStepVerifyPhone from "../Steps/NewStepVerifyPhone/NewStepVerifyPhone";
import StepIntroduction from "../Steps/StepIntroduction/StepIntroduction";
import NewStepInstructions from "../Steps/NewStepInstructions/NewStepInstructions";
import StepSelectDocument from "../Steps/StepSelectDocument/StepSelectDocument";
import MyPersonalIncome from "../Steps/MyPersonalIncome/MyPersonalIncome";
import FundsDate from "../Steps/FundsDueDate/FundsDate";
import StepSecondCoApplicant from "../Steps/StepSecondCoApplicant/StepSecondCoApplicant";
import StepBusinessEin from "../Steps/StepBusinessEIN /StepBusinessEIN";
import StepBusinessEinSecond from "../Steps/StepBusinessEINSecond/StepBusinessEINSecond";
import StepBusinessEinThird from "../Steps/StepBusinessEINThird/StepBusinessEINThird";
import StepCompanyInformation from "../Steps/StepCompanyInformation/StepCompanyInformation";
import StepCompanyInformationParent from "../Steps/StepCompanyInformationParent/StepCompanyInformationParent";
import StepTermLoan from "../Steps/StepTermLoan/StepTermLoan";
import DepositSubProducts from "../Steps/DepositSubProducts/DepositSubProducts";
import LoanSubProducts from "../Steps/LoanSubProducts/LoanSubProducts";
import CardSubProducts from "../Steps/CardSubProducts/CardSubProducts";
import StepTermLoanPicker from "../Steps/StepTermLoanPicker/StepTermLoanPicker";
import CalculateFees from "../Steps/CalculateFees/CalculateFees";
import ScanResult from "../Steps/ScanResult/ScanResult";
import { PersonalInfoProvider } from "../../store/PersonalInfo/PersonalInfoContext";
import { AccountProvider } from "../../store/AccountContext";
import DocumentAgreement from "../Steps/StepDocumentAgreement/DocumentAgreement";
import StepAreYou from "../Steps/StepAreYou/StepAreYou";
import StepAreYouSecond from "../Steps/StepAreYouSecond/StepAreYouSecond";
import { authService } from "../../services";

const Onboarding: React.FC<IOnboarding> = () => {
  const PrivateRoute: React.ComponentType<any> = ({ component, ...rest }) => {
    if (!component) throw Error("component is undefined");
    const token = authService.getAccessToken();

    // Note: JSX Elements have to be uppercase
    const Component = component;

    const renderRoute = (props: RouteComponentProps<any>): React.ReactNode => {
      if (!token) return <Redirect to={{ pathname: "/login" }} />;

      return <Component {...props} />;
    };

    return <Route {...rest} render={renderRoute} />;
  };
  return (
    <ProspectProvider>
      <DocumentsProvider>
        <ConsentsProvider>
          <BsaProvider>
            <TermLoanProvider>
              <PersonalInfoProvider>
                <PersonalMortgageLoanProvider>
                  <AccountProvider>
                    <UrlStateManager />
                    <ScrollRestoration />
                    <Switch>
                      <Route path="/onboarding/authentication-email">
                        <StepAuthenticationEmail />
                      </Route>
                      <Route path="/onboarding/deposit-sub-products">
                        <DepositSubProducts />
                      </Route>
                      <Route path="/onboarding/verify-number">
                        <NewStepVerifyPhone />
                      </Route>
                      <Route path="/onboarding/terms-and-conditions">
                        <StepTermsAndConditions />
                      </Route>
                      <Route path="/onboarding/select-document">
                        <StepSelectDocument />
                      </Route>
                      <Route path="/onboarding/capture-documents">
                        <StepCaptureDocuments />
                      </Route>
                      <Route path="/onboarding/front">
                        <StepFrontDocument />
                      </Route>
                      <Route path="/onboarding/back">
                        <StepFrontDocument />
                      </Route>
                      <Route path="/onboarding/scan-result">
                        <ScanResult />
                      </Route>
                      <PrivateRoute
                        path="/onboarding"
                        component={() => <NewStepInstructions />}
                      />
                      <Route path="/onboarding/my-personal-income">
                        <MyPersonalIncome />
                      </Route>
                      <Route path="/onboarding/funds-due-date">
                        <FundsDate />
                      </Route>
                      <Route path="/onboarding/company-information">
                        <StepCompanyInformation />
                      </Route>
                      <Route path="/onboarding/company-information-parent">
                        <StepCompanyInformationParent />
                      </Route>
                      <Route path="/onboarding/verify-email">
                        <StepVerifyEmail />
                      </Route>
                      <Route path="/onboarding/fees-calculate">
                        <CalculateFees />
                      </Route>
                      <Route path="/onboarding/business-or-personal">
                        <StepBusinessOrPersonal />
                      </Route>
                      <Route path="/onboarding/second-co-applicant">
                        <StepSecondCoApplicant />
                      </Route>
                      <Route path="/onboarding/term-loan">
                        <StepTermLoan />
                      </Route>
                      <Route path="/onboarding/term-loan-picker">
                        <StepTermLoanPicker />
                      </Route>
                      <Route path="/onboarding/business-ein">
                        <StepBusinessEin />
                      </Route>
                      <Route path="/onboarding/business-ein-second">
                        <StepBusinessEinSecond />
                      </Route>
                      <Route path="/onboarding/business-ein-third">
                        <StepBusinessEinThird />
                      </Route>
                      <Route path="/onboarding/are-you">
                        <StepAreYou />
                      </Route>
                      <Route path="/onboarding/are-you-second">
                        <StepAreYouSecond />
                      </Route>
                      <Route path="/onboarding/document-agreement">
                        <DocumentAgreement />
                      </Route>
                      <Route path="*">
                        <div
                          data-testid="onboarding"
                          className="mainContainer_wrapper"
                        >
                          <div className="mainContainer">
                            <Route path="/onboarding/authentication-phone">
                              <StepAuthenticationPhone />
                            </Route>
                            <Route path="/onboarding/loan-sub-products">
                              <LoanSubProducts />
                            </Route>
                            <Route path="/onboarding/cards-sub-products">
                              <CardSubProducts />
                            </Route>
                            <Route path="/onboarding/introduction">
                              <StepIntroduction />
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
                            <Route path="/onboarding/bsa-questionnaire">
                              <StepBSAQuestionnaire />
                            </Route>
                            <Route path="/onboarding/other-applicants">
                              <StepOnboardOthers />
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
                          </div>
                        </div>
                      </Route>
                    </Switch>
                  </AccountProvider>
                </PersonalMortgageLoanProvider>
              </PersonalInfoProvider>
            </TermLoanProvider>
          </BsaProvider>
        </ConsentsProvider>
      </DocumentsProvider>
    </ProspectProvider>
  );
};

export default Onboarding;
