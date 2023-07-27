import React from "react";
import { IStepAreYou } from "../StepAreYou/types";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import HeaderBusinessEin from "../../BusinessEin/HeaderBusinessEin";
import Select from "react-select";

const StepAreYouSecondView = ({ goToNextScreen }: IStepAreYou) => {
  const options = [
    {
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    { value: "Sed at luctus est", label: "Sed at luctus est" },
    {
      value: "Nam consectetur convallis aliquet",
      label: "Nam consectetur convallis aliquet",
    },
  ];
  const customStyles = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: 0,
      borderRadius: "8px",
    }),
  };

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
          <div className="font-inter min-w-[608px]">
            <HeaderBusinessEin text="Are you any of the following..." />
            <div>
              <p className="text-sm text-neutral100 font-medium mb-2 mt-[58px]">
                Agents of Business
              </p>
              <Select
                styles={customStyles}
                defaultValue={options[0]}
                className="border border-neutral30 rounded-lg h-[40px]"
                options={options}
              />
            </div>
            <div className={"mt-[22px]"}>
              <p className="text-sm font-medium mb-2 text-neutral100">
                Executive Team
              </p>
              <Select
                styles={customStyles}
                defaultValue={options[1]}
                className="border border-neutral30 rounded-lg h-[40px]"
                options={options}
              />
            </div>
            <p className="text-sm font-medium mb-2 mt-6 text-neutral100">
              If none of the above, are you either of the following:
            </p>
            <p className="text-sm font-medium mb-2 mt-[126px]">
              We will require your by-laws at the end of this application to
              further update our records.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StepAreYouSecondView;
