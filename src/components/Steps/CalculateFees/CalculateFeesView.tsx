import React from "react";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import { ICalculateFeesView } from "./types";
import FundsDateField from "../FundsDueDate/components/FundsDateField";
import PersonalIncomeField from "../MyPersonalIncome/components/PersonalIncomeField";

const CalculateFeesView: React.FC<ICalculateFeesView> = ({
  fees,
  control,
  errors,
  onSubmit,
  additionalInfoForFees,
}) => (
  <Layout
    className="ni-funds-calculate"
    classNameContainer="flex flex-1 justify-center items-center"
    onGetStarted={onSubmit}
    hideHeader
    isBankHeader
    sidebarType={SIDEBAR_TYPE.NAVIGATION}
    sidebarProps={{
      customText: <></>,
      className: "ni-sidebar-fixed",
    }}
    onClickNext={onSubmit}
  >
    <div className="ni-scrrolable-standart-footer flex flex-1 bg-neutral20 h-full items-center justify-center flex-col">
      <FundsDateField control={control} errors={errors} />
      <PersonalIncomeField
        className="mt-[40px]"
        fees={fees}
        calculation
        control={control}
        errors={errors}
        name="personal-income"
        additionalInfo={additionalInfoForFees}
      />
    </div>
  </Layout>
);

export default CalculateFeesView;
