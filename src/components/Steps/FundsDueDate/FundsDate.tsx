import React, { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "../../../store/LoadingContext";
import { ProspectContext } from "../../../store";
import { ISignerDetails } from "../../../store/reducers/type";
import { log } from "../../../services";
import FundsDateView from "./FundsDateView";

const FundsDate: React.FC = () => {
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { prospect, updateSigner } = useContext(ProspectContext);

  const { handleSubmit, control, errors } = useForm<ISignerDetails>({
    mode: "onChange",
    defaultValues: {
      ...prospect.signer,
      fundsDueDate: new Date(prospect.signer?.fundsDueDate || new Date()),
      borrowed: prospect.signer?.borrowed || false,
    },
  });

  const onSubmit = useCallback(
    async (data: ISignerDetails) => {
      if (!Object.keys(errors).length) {
        log.info(JSON.stringify(data), "StepFundsDueDate");
        setLoading(true);
        // update state
        await updateSigner({ ...prospect.signer, ...data, consent: true });
        setLoading(false);
        history.push("/onboarding/fees-calculate");
      }
    },
    [updateSigner, errors]
  );

  const handleOnSubmit = handleSubmit(onSubmit);

  return (
    <FundsDateView
      onSubmit={handleOnSubmit}
      control={control}
      errors={errors}
    />
  );
};

export default FundsDate;
