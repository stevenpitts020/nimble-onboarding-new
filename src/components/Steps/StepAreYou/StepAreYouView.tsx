import React, { useState } from "react";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import HeaderBusinessEin from "../../BusinessEin/HeaderBusinessEin";
import ReactSwitch from "react-switch";
import { IStepAreYou } from "./types";

const StepAreYouView = ({ goToNextScreen }: IStepAreYou) => {
  const [toggle, setToggle] = useState(true);
  return (
    <Layout
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      classNameContainer={"m-auto"}
      hideHeader
      onClickNext={goToNextScreen}
      showTimer={false}
    >
      <div className="mainContainer_wrapper">
        <div className="mainContainer">
          <div className="font-inter min-w-[608px] font-inter">
            <HeaderBusinessEin text="Are you ...." />
            <p className="font-medium text-neutral100 text-sm mt-[46px] mb-[37px]">
              An agent or executive with the company as well?
            </p>
            <div className="flex justify-center">
              <p className="text-sm  text-neutral60 group-hover:text-blueDarkerSecond font-inter font-normal">
                co-applicant/guarantor
              </p>
              <div className="ml-[15px] mr-3">
                <ReactSwitch
                  checked={toggle}
                  onChange={() => {
                    setToggle(!toggle);
                  }}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor={"#036BFC"}
                  width={42}
                  height={24}
                />
              </div>

              <p className="ml-0.5 text-sm text-neutral60 group-hover:text-blueDarkerSecond font-inter font-bold">
                agent of the business
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StepAreYouView;
