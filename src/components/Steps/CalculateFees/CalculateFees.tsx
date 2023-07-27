import React, { useCallback, useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoadingContext } from "../../../store/LoadingContext";
import { ProspectContext } from "../../../store";
import { ISignerDetails } from "../../../store/reducers/type";
import CalculateFeesView from "./CalculateFeesView";
import { log } from "../../../services";
import { useHistory } from "react-router-dom";

const CalculateFees: React.FC = () => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { prospect, updateSigner } = useContext(ProspectContext);
  const [fees, setFees] = useState(
    (prospect.signer.incomeFunds || 50000) * 0.0003
  );

  const { handleSubmit, control, errors, watch, setValue } =
    useForm<ISignerDetails>({
      mode: "onChange",
      defaultValues: {
        ...prospect.signer,
        fundsDueDate: new Date(prospect.signer?.fundsDueDate || new Date()),
        incomeFunds: prospect.signer?.incomeFunds || 0,
      },
    });
  const incomeFunds = watch("incomeFunds");

  useEffect(() => {
    if (incomeFunds) {
      setFees(incomeFunds * 0.0003);
      setValue("fees", incomeFunds * 0.0003);
    }
  }, [incomeFunds]);

  const onSubmit = useCallback(
    async (data: ISignerDetails) => {
      if (!Object.keys(errors).length) {
        log.info(JSON.stringify(data), "StepFeesCalculate");
        setLoading(true);
        // update state
        await updateSigner({ ...prospect.signer, ...data, consent: true });
        setLoading(false);
        history.push("");
      }
    },
    [updateSigner, errors]
  );

  const handleOnSubmit = handleSubmit(onSubmit);

  const additionalInfoForFees = <span>per month</span>;
  return (
    <CalculateFeesView
      fees={fees}
      onSubmit={handleOnSubmit}
      additionalInfoForFees={additionalInfoForFees}
      control={control}
      errors={errors}
    />
  );
};

export default CalculateFees;
