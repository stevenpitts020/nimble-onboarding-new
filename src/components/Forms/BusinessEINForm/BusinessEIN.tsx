import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ISignerDetails } from "../../../store/reducers/type";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../BusinessEin/AuthSchemeEin";
import InputBusinessEinWithController from "../../BusinessEin/InputBusinessEinWithController";
import * as Icon from "react-feather";
import { IStepBusinessEINForm } from "./types";
import { UrlContext } from "../../../store/UrlContext";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";

const BusinessEin = ({
  defaultValues,
  onSubmit,
  children,
  textInput,
  goToNextScreen,
  goToNextScreenIfEmpty,
  renderHeader,
}: IStepBusinessEINForm) => {
  const [showNextButton, setShowNextButton] = useState(true);
  const [customNextButtonName, setCustomNextButtonName] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [isErrorDuringSubmission, setIsErrorDuringSubmission] = useState(false);
  const { currentStep } = useContext(UrlContext);

  if (defaultValues) {
    defaultValues.ssn = defaultValues.ssn || "";
    defaultValues.ein = defaultValues.ein || "";
  }
  const { handleSubmit, errors, trigger, watch, register, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onError = () => {
    setIsErrorDuringSubmission(true);
  };

  const watchEin = watch("ein");

  useEffect(() => {
    const matches = (watchEin || "").match(/\(\d{2}\)-\d{7}/) || [];
    if (
      !showErrors &&
      (matches.length || (watchEin && watchEin.replaceAll("_", "").length >= 9))
    ) {
      setShowErrors(true);
    }
    (currentStep === "business-ein" || currentStep === "business-ein-second") &&
      (watchEin === ""
        ? setCustomNextButtonName("DON’T KNOW")
        : setCustomNextButtonName("Continue"));
    (currentStep === "company-information" ||
      currentStep === "company-information-parent") &&
      setCustomNextButtonName("Continue");
    setShowNextButton(true);

    (showErrors && Object.keys(errors).length === 0) ||
    ((currentStep === "business-ein" ||
      currentStep === "business-ein-second") &&
      watchEin === "")
      ? setShowNextButton(true)
      : setShowNextButton(false);
  }, [Object.keys(errors).length, showErrors, watchEin]);

  useEffect(() => {
    for (const objectKey in defaultValues) {
      if (defaultValues && defaultValues[objectKey]) {
        trigger(objectKey as keyof ISignerDetails);
      }
    }
  }, [defaultValues, trigger]);
  const onFormSubmit = async (data: ISignerDetails) => {
    if (onSubmit) {
      await onSubmit(data);
      if (typeof data.ein === "string") {
        sessionStorage.setItem("ein", data.ein);
      }
    }
  };
  return (
    <Layout
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      classNameContainer={"m-auto"}
      hideHeader
      onClickNext={
        watchEin === "" && goToNextScreenIfEmpty
          ? goToNextScreenIfEmpty
          : goToNextScreen
      }
      showTimer={false}
      disableEnter={true}
      nextButtonLabel={customNextButtonName}
      hideNextButton={!showNextButton}
    >
      <div className="mainContainer_wrapper">
        <div className="mainContainer">
          <div>
            {renderHeader()}
            <form
              className="font-inter min-w-[608px]"
              onSubmit={handleSubmit(onFormSubmit, onError)}
            >
              <div className="mt-2">
                <InputBusinessEinWithController
                  label="test"
                  type="tel"
                  autoComplete="ein"
                  className="span-4"
                  control={control}
                  example="12-3456789"
                  format={"##-#######"}
                  text={textInput}
                  placeholder={"00-0000000"}
                  errors={errors.ein}
                  ref={register}
                  defaultValue={defaultValues.ein}
                  autoFocus={true}
                  name="ein"
                />
              </div>
            </form>
            {children}
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
        </div>
      </div>
    </Layout>
  );
};

export default BusinessEin;
