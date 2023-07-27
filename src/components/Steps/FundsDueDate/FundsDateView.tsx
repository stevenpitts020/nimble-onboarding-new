import React from "react";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import { IFundsDateView } from "./types";
import FundsDateField from "./components/FundsDateField";

import "./FundsDate.sass";

const FundsDateView: React.FC<IFundsDateView> = ({
  onSubmit,
  control,
  errors,
}) => (
  <Layout
    className="ni-funds-due-date"
    classNameContainer="flex flex-1 justify-center items-center"
    sidebarType={SIDEBAR_TYPE.NAVIGATION}
    hideHeader
    isBankHeader
    sidebarProps={{
      customText: <></>,
      className: "ni-sidebar-fixed",
    }}
    onClickNext={onSubmit}
  >
    <div className="flex flex-1 bg-neutral20 h-full items-center justify-center">
      <FundsDateField control={control} errors={errors} />
    </div>
  </Layout>
);

export default FundsDateView;
