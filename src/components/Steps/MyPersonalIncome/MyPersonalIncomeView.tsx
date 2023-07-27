import React from "react";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import { IStepMyPersonalIncomeView } from "./types";
import PersonalIncomeField from "./components/PersonalIncomeField";

import "./MyPersonalIncome.sass";

const MyPersonalIncomeView: React.FC<IStepMyPersonalIncomeView> = ({
  onSubmit,
  control,
  errors,
  customSidebarText,
  additionalFooterElement,
  onNext,
  disabledNext,
}) => (
  <Layout
    className="ni-step-personal-income"
    classNameContainer="flex flex-1 justify-center items-center"
    onGetStarted={onSubmit}
    sidebarType={SIDEBAR_TYPE.VERIFY_IDENTITY}
    hideHeader
    isBankHeader
    sidebarProps={{
      customText: customSidebarText,
    }}
    additionalFooterElement={additionalFooterElement}
    footerAutoHeight
    onClickNext={onNext}
    disableNextButton={disabledNext}
  >
    <div className="flex flex-1 bg-neutral20 h-full items-center justify-center">
      <PersonalIncomeField
        control={control}
        errors={errors}
        name="personal-income"
      />
    </div>
  </Layout>
);

export default MyPersonalIncomeView;
