import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Icon from "react-feather";
import { ISignerDetails } from "../../../store/reducers/type";
import InputAuthEmail from "../InputAuthEmail/InputAuthEmail";
import { IInputAuthFormEmail } from "./types";
import schema from "./AuthSchemaEmail";
import { log } from "../../../services";
import {
  authFormEmailSubtitle,
  authFormEmailTitle,
  checkDuplicateEmail,
  checkDuplicateEmailMessage,
  email,
  UNKNOWN,
} from "../../../utils/constants/variables";
import {
  checkResultsForDupe,
  getValidationData,
} from "../../../utils/AuthForms";
import { useLayout } from "../../../store/LayoutContext";
import "./AuthFormEmail.sass";

const AuthFormEmail = ({
  defaultValues,
  onValidate,
  onSubmit,
  className,
  style,
  signerId,
}: IInputAuthFormEmail) => {
  const [lastEmailValue, setLastEmailValue] = useState("");
  const [lastEmailValid, setLastEmailValid] = useState(true);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isErrorDuringSubmission, setIsErrorDuringSubmission] = useState(false);
  const history = useHistory();
  const signerIdValue: string = signerId || UNKNOWN;
  if (defaultValues) {
    defaultValues.ssn = defaultValues.ssn || "";
    defaultValues.phoneNumber = defaultValues.phoneNumber || "";
  }

  const checkDuplicates = async (signerIdValue, onValidate) => {
    const validationData = getValidationData(signerIdValue, email, getValues);

    try {
      return onValidate(validationData as ISignerDetails);
    } catch (error) {
      return false;
    }
  };
  schema.fields.email = schema.fields.email.test({
    name: checkDuplicateEmail,
    message: checkDuplicateEmailMessage,
    exclusive: true,
    test: async (value) => {
      const matches =
        (value || "").match(/\([2-9]\d{2}\) [2-9]\d{2}-\d{4}/) || [];
      // Avoid validating partial values as they are being typed
      if (
        value &&
        value.length <= 20 &&
        matches.length &&
        value !== lastEmailValue
      ) {
        const results = await checkDuplicates(signerIdValue, onValidate);
        setLastEmailValue(value);
        setLastEmailValid(
          checkResultsForDupe(results, "phoneNumber", signerIdValue)
        );
        return lastEmailValid;
      }
      if (
        value &&
        lastEmailValue &&
        value === `${lastEmailValue.substring(0, lastEmailValue.length - 1)}_`
      ) {
        // we want to rearm dupe checks if the user starts changing after previously validated
        setLastEmailValue("");
        return false;
      }
      if (value === lastEmailValue) {
        return lastEmailValid;
      }
      return true;
    },
  });
  const { handleSubmit, errors, trigger, watch, register, getValues } =
    useForm<ISignerDetails>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

  useEffect(() => {
    for (const objectKey in defaultValues) {
      if (defaultValues && defaultValues[objectKey]) {
        trigger(objectKey as keyof ISignerDetails);
      }
    }
  }, [defaultValues, trigger]);

  const onFormSubmit = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "prospectform");
    if (onSubmit) {
      await onSubmit(data);
    }
  };
  const onError = () => {
    setIsErrorDuringSubmission(true);
  };
  const goToNext = () => {
    if (sessionStorage.getItem("AccountType") === "Business") {
      history.push("/onboarding/business-ein");
    } else {
      history.push("/onboarding/authentication-phone");
    }
  };
  useLayout({ showNextButton, goToNext, showTimer: true });

  const watchEmail = watch("email");
  useEffect(() => {
    Object.keys(errors).length === 0 && watchEmail
      ? setShowNextButton(true)
      : setShowNextButton(false);
  }, [Object.keys(errors).length, watchEmail]);
  return (
    <div data-testid="AuthFormEmail" className={className} style={style}>
      <form onSubmit={handleSubmit(onFormSubmit, onError)}>
        <div className="max-w-33 font-inter">
          <div className="text-center">
            <h1 className="text-2xl leading-9 font-bold text-dark">
              {authFormEmailTitle}
            </h1>
            <p className="text-gray text-base mt-2 mb-6 leading-6 px-8">
              {authFormEmailSubtitle}
            </p>
          </div>
          <InputAuthEmail
            name="email"
            label="Email"
            data-testid="input-email"
            autoComplete="email"
            placeholder="name@website.com"
            type="text"
            defaultValue={defaultValues?.email}
            className="span-8"
            errors={errors.email}
            ref={register}
            autoFocus={true}
            onFocus={() => setShowNextButton(true)}
          />
          {Object.keys(errors).length > 0 && isErrorDuringSubmission ? (
            <div
              role="alert"
              className="alert toast is-error"
              data-testid="form-errors"
            >
              <Icon.AlertCircle /> Please review the form before continuing.
            </div>
          ) : (
            <div className="invisible-error" />
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthFormEmail;
