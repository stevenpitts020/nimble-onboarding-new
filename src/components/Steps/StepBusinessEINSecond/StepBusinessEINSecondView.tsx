import React from "react";
import HeaderBusinessEin from "../../BusinessEin/HeaderBusinessEin";
import InputBusinessEin from "../../BusinessEin/InputBusinessEin";
import { IStepBusinessEINSecondView } from "./types";
import BusinessEin from "../../Forms/BusinessEINForm/BusinessEIN";

const StepBusinessEinSecondView = ({
  defaultValues,
  onSubmit,
  goToNextScreen,
  goToNextScreenIfEmpty,
}: IStepBusinessEINSecondView) => {
  return (
    <BusinessEin
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      textInput={"Parent Company (EIN #)"}
      goToNextScreen={goToNextScreen}
      goToNextScreenIfEmpty={goToNextScreenIfEmpty}
      renderHeader={() => <HeaderBusinessEin text="Identify Who is Applying" />}
    >
      <p className="font-medium mt-[11px]">or..</p>
      <div className="mt-2">
        <InputBusinessEin
          text="Parent Company (Website Domain)"
          placeholder=""
          withDomain
        />
      </div>
    </BusinessEin>
  );
};

export default StepBusinessEinSecondView;
