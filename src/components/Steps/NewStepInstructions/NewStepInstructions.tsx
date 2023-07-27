import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NewStepInstructionsView from "./NewStepInstructionsView";
import { ISignerDetails } from "../../../store/reducers/type";
import { LoadingContext } from "../../../store/LoadingContext";
import { InstitutionContext, ProspectContext } from "../../../store";
import schema from "../../Forms/AuthFormPhone/AuthSchemaPhone";
import { log } from "../../../services";
import usePhoneClues from "./UsePhoneClues";

const NewStepInstructions: React.FC = () => {
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { prospect, updateSigner } = useContext(ProspectContext);
  const institution = useContext(InstitutionContext);

  const [emptyField, setEmptyField] = useState(false);

  const { handleSubmit, control, errors, watch } = useForm<ISignerDetails>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: prospect.signer,
  });

  const phoneNumber = watch("phoneNumber");
  const showError = useMemo(() => {
    const isCorrect =
      !phoneNumber ||
      (phoneNumber &&
        /\([2-9|\s](\d|\s){2}\) [2-9|\s](\d|\s){2}-(\d|\s){4}/.test(
          phoneNumber
        ));
    return (
      !isCorrect ||
      !!(phoneNumber && phoneNumber.replaceAll(" ", "").length >= 13)
    );
  }, [phoneNumber]);

  const clues = usePhoneClues(
    phoneNumber,
    showError ? errors.phoneNumber : undefined
  );

  useEffect(() => {
    // Avoid validating partial values as they are being typed
    if (!phoneNumber) {
      timeoutRef.current = setTimeout(() => setEmptyField(true), 2000);
    } else {
      timeoutRef.current = null;
      setEmptyField(false);
    }
  }, [Object.keys(errors).length, phoneNumber]);

  const onSubmit = useCallback(
    async (data: ISignerDetails) => {
      log.info(JSON.stringify(data), "NewStepInstructions");

      if (!Object.keys(errors).length) {
        setLoading(true);
        // update state
        updateSigner({ ...prospect.signer, ...data, consent: true });
        setLoading(false);
        history.push("/onboarding/verify-number");
      }
    },
    [prospect, errors]
  );

  const goToTerms = useCallback(() => {
    history.push("/onboarding/terms-and-conditions");
  }, []);

  return (
    <NewStepInstructionsView
      showSidebarTips={emptyField}
      control={control}
      onGetStarted={handleSubmit(onSubmit)}
      disableGetStarted={!!(Object.keys(errors).length || !phoneNumber)}
      logoUrl={institution?.logoUri?.default || ""}
      logoName={institution?.name || ""}
      clues={clues}
      goToTerms={goToTerms}
    />
  );
};

export default NewStepInstructions;
