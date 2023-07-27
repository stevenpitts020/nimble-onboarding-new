import React from "react";
import HeaderBusinessEin from "../../BusinessEin/HeaderBusinessEin";
import InputBusinessEin from "../../BusinessEin/InputBusinessEin";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";

const StepBusinessEinThirdView = ({ goToNext }) => {
  return (
    <Layout
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      classNameContainer={"m-auto"}
      hideHeader
      onClickNext={goToNext}
      showTimer={false}
    >
      <div className="mainContainer_wrapper">
        <div className="mainContainer">
          <div className="font-inter min-w-[608px]">
            <HeaderBusinessEin text="Identify Who is Applying" />
            <div className="mt-2">
              <InputBusinessEin text="NAICS Code" placeholder="" />
            </div>
            <p className="font-medium mt-[11px]">or..</p>
            <div className="mt-2">
              <InputBusinessEin text="Industry Code" placeholder="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StepBusinessEinThirdView;
