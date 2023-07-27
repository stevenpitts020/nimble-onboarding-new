import React from "react";
import { Layout } from "../../NewLayout/Layout";
import { IStepAuthenticationEmailView } from "./types";
import "./StepAuthenticationEmail.sass";
import { centeredRoundedChild } from "../../../utils/constants/layoutConfig";
import Input from "../../Forms/NewInput/Input";
import { ReactComponent as Email } from "./email.svg";
import { Controller } from "react-hook-form";
import clsx from "clsx";

const StepAuthenticationEmailView: React.FC<IStepAuthenticationEmailView> = ({
  onSubmit,
  control,
  errors,
  clues,
  onBlurInput,
}) => {
  return (
    <Layout
      className="ni-new-step-instructions"
      classNameContainer="flex flex-1 flex-col justify-center items-center"
      onGetStarted={onSubmit}
      disableGetStarted={!!Object.keys(errors || {}).length}
      hideHeader
      onClickNext={onSubmit}
      disableNextButton={!!Object.keys(errors || {}).length}
      showTimer={false}
      onlyPrivacy
      disableEnter
    >
      <img src="/mocks/company.png" alt="company" />
      <div className={clsx(centeredRoundedChild, "pb-[134px]")}>
        <div>
          <h1 className="font-lora text-56/120% font-bold text-neutral100">
            Registering..
          </h1>
          <p className="font-inter mt-9 w-[608px] text-16/19 text-neutral60">
            Aside from our requirements to obtain contact information from every
            applicant, we also want to provide you with the convenience of
            resuming your application where you left off, if it so happens that
            we get interrupted at all today.{" "}
          </p>
        </div>
        <div className="w-[379px] mb-3 mt-10">
          <Controller
            control={control}
            name="email"
            render={({ onChange, value, name }) => (
              <Input
                name={name}
                label="EMAIL"
                renderIcon={({ color }) => <Email fill={color} />}
                example="username@website.com"
                placeholder="name@website.com"
                autoFocus
                clues={clues}
                value={value}
                onChange={(value) => onChange(value)}
                onBlur={onBlurInput}
                isFromCache
                tooltip="If you are applying on behalf of a business provide a professional email address"
              />
            )}
          />
        </div>
      </div>
    </Layout>
  );
};

export default StepAuthenticationEmailView;
