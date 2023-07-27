import React from "react";
import HeaderBusinessEin from "../../BusinessEin/HeaderBusinessEin";
import { IStepCompanyInformationView } from "./types";
import BusinessEin from "../../Forms/BusinessEINForm/BusinessEIN";
import InputBusinessEin from "../../BusinessEin/InputBusinessEin";

const StepCompanyInformationView = ({
  defaultValues,
  onSubmit,
  goToNextScreen,
}: IStepCompanyInformationView) => {
  return (
    <BusinessEin
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      textInput={"Company EIN #"}
      goToNextScreen={goToNextScreen}
      renderHeader={() => <HeaderBusinessEin text="Company Information" />}
    >
      <div className="my-2">
        <InputBusinessEin
          text="SIC / NAICS / Industry Description "
          placeholder="112 / 112000"
        />
      </div>
      <div className="my-2">
        <InputBusinessEin text="Legal Entity Name" placeholder="name" />
      </div>
      <div className="my-2">
        <InputBusinessEin text="Entity Type" placeholder="type" />
      </div>
      <div className="my-2">
        <InputBusinessEin
          text="State Incorporated"
          placeholder="DE - Delaware"
        />
      </div>
      <div className="my-2">
        <InputBusinessEin text="Date Incorporated" placeholder="09/26/1981" />
      </div>
    </BusinessEin>
  );
};

export default StepCompanyInformationView;
