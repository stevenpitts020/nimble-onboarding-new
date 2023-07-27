import React, { useCallback, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import MyPersonalIncomeView from "./MyPersonalIncomeView";
import { LoadingContext } from "../../../store/LoadingContext";
import { ProspectContext } from "../../../store";
import { ISignerDetails } from "../../../store/reducers/type";
import { log } from "../../../services";
import SidebarDescription from "./components/SidebarDescription";
import SidebarText from "./components/SidebarText";
import FooterCheckbox from "./components/FooterCheckbox";
import { IncomeWeeks } from "./enums";

const MyPersonalIncome: React.FC = () => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { prospect, updateSigner } = useContext(ProspectContext);
  const [footerCheck, setFooterCheck] = useState(false);

  const { handleSubmit, control, errors } = useForm<ISignerDetails>({
    mode: "onChange",
    defaultValues: {
      ...prospect.signer,
      incomeFunds: prospect.signer?.incomeFunds || 0,
      incomeWeek: prospect.signer?.incomeWeek || IncomeWeeks.W2,
    },
  });

  const onSubmit = useCallback(
    async (data: ISignerDetails) => {
      if (!Object.keys(errors).length) {
        log.info(JSON.stringify(data), "StepMyPersonalIncome");
        setLoading(true);
        // update state
        await updateSigner({ ...prospect.signer, ...data, consent: true });
        setLoading(false);
        history.push("/onboarding/funds-due-date");
      }
    },
    [updateSigner, errors]
  );

  const sidebarInfoComponent: React.ReactNode = (
    <div className="personal-income-description p-[24px] mt-[73px]">
      <SidebarDescription />
      <SidebarText />
    </div>
  );

  const setFooterValue = () => setFooterCheck(!footerCheck);

  const footerField: React.ReactNode = (
    <FooterCheckbox checked={footerCheck} onChange={setFooterValue} />
  );

  const handleOnSubmit = handleSubmit(onSubmit);

  return (
    <MyPersonalIncomeView
      disabledNext={!footerCheck}
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
      customSidebarText={sidebarInfoComponent}
      additionalFooterElement={footerField}
      onNext={handleOnSubmit}
    />
  );
};

export default MyPersonalIncome;
