import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "react-feather";
import { ISignerDetails } from "../../../store/reducers/type";
import InputAuthWithMask from "../InputAuthWithMask/InputAuthWithMask";
import { IInputAuthForm } from "./types";
import schema from "./AuthSchemaPhone";
import { log } from "../../../services";
import {
  authFormPhoneSubtitle,
  authPhoneTitle,
  pleaseReviewTheFormBeforeContinuing,
  thisNumberWillNeverBeUsed,
} from "../../../utils/constants/general";
import { useLayout } from "../../../store/LayoutContext";
import "./AuthFormPhone.sass";

const AuthFormPhone = ({
  defaultValues,
  onSubmit,
  className,
  style,
}: IInputAuthForm) => {
  const [showNextButton, setShowNextButton] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const history = useHistory();

  if (defaultValues) {
    defaultValues.ssn = defaultValues.ssn || "";
    defaultValues.phoneNumber = defaultValues.phoneNumber || "";
  }

  const { handleSubmit, errors, watch, trigger, control } =
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
      onSubmit(data);
    }
  };
  const goToNext = () => {
    history.push("/onboarding/verify-number");
  };
  useLayout({ showNextButton, goToNext });

  const phoneNumber = watch("phoneNumber");
  useEffect(() => {
    const matches =
      (phoneNumber || "").match(/\([2-9]\d{2}\)-[2-9]\d{2}-\d{4}/) || [];
    // Avoid validating partial values as they are being typed
    if (
      !showErrors &&
      (matches.length ||
        (phoneNumber && phoneNumber.replaceAll("_", "").length >= 14))
    ) {
      setShowErrors(true);
    }

    showErrors && Object.keys(errors).length === 0 && phoneNumber !== ""
      ? setShowNextButton(true)
      : setShowNextButton(false);
  }, [Object.keys(errors).length, showErrors, phoneNumber]);

  return (
    <>
      <div data-testid="AuthFormPhone" className={className} style={style}>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          data-testid="step-auth-continue"
        >
          <div className="max-w-33 mb-2">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-dark font-inter">
                {authPhoneTitle}
              </h1>
              <p className="text-gray text-base mt-2 mb-8 leading-6 font-inter">
                {authFormPhoneSubtitle}
              </p>
            </div>
            <InputAuthWithMask
              name="phoneNumber"
              data-testid="phoneNumber"
              label="test"
              type="tel"
              autoComplete="tel"
              defaultValue={defaultValues?.phoneNumber}
              className="span-4"
              errors={showErrors ? errors.phoneNumber : undefined}
              control={control}
              example="(123) 456-7890"
              autoFocus={true}
              tooltip={
                "One of the ways we authenticate " +
                "your identity is by cell phone registry, device model, and location"
              }
            />
            <span className="text-center text-gray text-sm font-inter">
              {thisNumberWillNeverBeUsed}
            </span>
            {showErrors && Object.keys(errors).length > 0 ? (
              <div
                role="alert"
                className="alert toast is-error"
                data-testid="form-errors"
              >
                <AlertCircle /> {pleaseReviewTheFormBeforeContinuing}
              </div>
            ) : (
              <div className="invisible-error" />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthFormPhone;
