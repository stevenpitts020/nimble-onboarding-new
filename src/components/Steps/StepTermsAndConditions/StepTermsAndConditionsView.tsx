import React from "react";
import TermsAndConditions from "../../Legal/TermsAndConditions/TermsAndConditions";
import SideMenu from "./SideMenu";
import { IStepTermsAndConditions } from "./types";
import "./StepTermsAndConditions.sass";
import { Layout } from "../../NewLayout/Layout";

const StepTermsAndConditionsView = ({
  activeDisclosure,
  setActiveDisclosure,
  onConsent,
}: IStepTermsAndConditions) => (
  <Layout
    onClickNext={onConsent}
    hideBackButton
    hideHeader
    showTimer={false}
    nextButtonLabel="I Consent"
    tips={
      <p className="text-sm text-xiketic">
        By clicking <b>“I Consent”</b>, I agree to disclosures above.
      </p>
    }
  >
    <div className="flex pd-t">
      <div className="pt-4 pl-10">
        <img src="/mocks/company.png" width={195} height={52} alt="company" />
      </div>
    </div>
    <div className="flex flex-1 ">
      <div className="my-auto ml-5 w-[280px]">
        <SideMenu
          activeDisclosure={activeDisclosure}
          setActiveDisclosure={setActiveDisclosure}
        />
      </div>
      <div className="flex terms-container mt-10 ml-20 mr-56">
        <TermsAndConditions activeDisclosure={activeDisclosure} />
      </div>
    </div>
  </Layout>
);

export default StepTermsAndConditionsView;
