import React from "react";
import userImageSVG from "./userImage.svg";
import doubleUserSVG from "./doubleUserSVG.svg";
import xmarkSVG from "./xmark.svg";
import checkSVG from "./check.svg";
import { coApplicants, guarantor } from "./mocks";
import { IStepCoApplicantView } from "./types";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";

const StepCoApplicantView = ({ handleClickCard }: IStepCoApplicantView) => (
  <Layout
    classNameContainer="text-darkBlue font-poppins m-auto"
    onClickNext={handleClickCard}
    sidebarType={SIDEBAR_TYPE.NAVIGATION}
    hideHeader
  >
    <div className="mainContainer_wrapper">
      <div className="mainContainer">
        <div>
          <h2 className="font-bold  text-28 max-w-[541px] mx-auto text-center">
            Are you requesting as well to add others to your request?
          </h2>
          <p className="text-sm text-center mt-3">
            Select category related to your request
          </p>
          <div className="mt-12 grid lg:grid-cols-3 gap-[62px] ">
            <div className="border-4 border-darkGray min-w-[250px]">
              <h4 className="mt-[62px] text-center font-semibold text-18">
                Just Me
              </h4>
              <img
                src={userImageSVG}
                alt={userImageSVG}
                className="mx-auto mt-[41px] mb-[118px] "
              />
            </div>
            <button className="border col-span-2" onClick={handleClickCard}>
              <div className="mt-4 flex">
                <h4 className="text-18 font-semibold ml-[63px] mr-[92px]">
                  Others
                </h4>
                <img src={doubleUserSVG} alt="" />
              </div>
              <div className="mt-[25px] grid grid-cols-2 mx-[33px] pb-[41px]">
                <div>
                  <h4 className="font-semibold text-18 text-darkBlue">
                    Guarantor(s)
                  </h4>
                  {guarantor.map((text: string) => (
                    <div key={text} className="flex items-start mt-[15px] ">
                      <img src={xmarkSVG} alt={xmarkSVG} className="mt-1" />
                      <p className="ml-[13px] text-darkBlueSecond text-[13px]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-18 text-darkBlue">
                    Co-Applicant(s)
                  </h4>
                  {coApplicants.map((text: string) => (
                    <div key={text} className="flex items-start mt-[15px] ">
                      <img src={checkSVG} alt={checkSVG} className="mt-1" />
                      <p className="ml-[13px] text-darkBlueSecond text-[13px]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default StepCoApplicantView;
