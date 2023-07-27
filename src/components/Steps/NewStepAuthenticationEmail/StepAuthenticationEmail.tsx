import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import StepAuthenticationEmailView from "./StepAuthenticationEmailView";
import { LoadingContext } from "../../../store/LoadingContext";
import { ProspectContext } from "../../../store";
import { ISignerDetails } from "../../../store/reducers/type";
import { log } from "../../../services";
import flow from "../../../services/Flow";
import schema from "../../Forms/AuthFormEmail/AuthSchemaEmail";
import useEmailClues from "./UseEmailClues";
import useEmailAutocomplete from "../../../hooks/useEmailAutocomplete";

const StepAuthenticationEmail: React.FC = () => {
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const { prospect, updateSigner } = useContext(ProspectContext);
  const [showErrors, setShowErrors] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  const { handleSubmit, control, errors, watch, setValue, getValues } =
    useForm<ISignerDetails>({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: {
        ...prospect.signer,
        email: prospect.signer?.email || "",
      },
    });

  const onApplySuggestion = useCallback(
    (domain) => {
      const email = getValues("email");
      const newEmail = email?.split("@")[0] + "@" + domain;
      setValue("email", newEmail, { shouldValidate: true });
    },
    [setValue, getValues]
  );

  const watchEmail = watch("email");
  const recommendationDomains = useEmailAutocomplete(watchEmail);

  useEffect(() => {
    if (!watchEmail) {
      timeoutRef.current = setTimeout(() => setEmptyField(true), 2000);
    } else {
      timeoutRef.current = null;
      setEmptyField(false);
    }
    if (!showErrors && watchEmail) {
      if (
        new RegExp("^.+@.*/...", "gi").test(watchEmail) || //finish entering
        new RegExp("^.*@.*@.*", "gi").test(watchEmail) || //two @
        new RegExp("^@.*", "gi").test(watchEmail) // start with @
      ) {
        setShowErrors(true);
      }
    }
  }, [watchEmail, showErrors]);

  const onSubmit = useCallback(
    async (data: ISignerDetails) => {
      log.info(JSON.stringify(data), "StepAuthenticationEmail");

      if (!Object.keys(errors).length) {
        setLoading(true);
        // update state

        await updateSigner({ ...prospect.signer, ...data, consent: true });
        setLoading(false);
        if (flow.isBuyNowPayLater()) {
          history.push("/onboarding/capture-documents");
        } else if (flow.isMainOnboarding()) {
          history.push("/onboarding/business-or-personal");
        } else {
          console.error("Unknown flow");
        }
      }
    },
    [updateSigner, errors]
  );

  const handleOnSubmit = handleSubmit(onSubmit);

  const { clues } = useEmailClues(
    watchEmail,
    showErrors ? errors.email : undefined,
    recommendationDomains,
    onApplySuggestion,
    handleOnSubmit
  );

  const onClickDisclosures = useCallback(() => {
    history.push("/onboarding/terms-and-conditions");
  }, []);

  const onBlurInput = useCallback(() => {
    setShowErrors(true);
  }, []);

  return (
    <StepAuthenticationEmailView
      showSidebarTips={emptyField}
      onSubmit={handleOnSubmit}
      control={control}
      errors={errors}
      onClickDisclosures={onClickDisclosures}
      clues={clues}
      onBlurInput={onBlurInput}
    />
  );
};

export default StepAuthenticationEmail;
