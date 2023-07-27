import React from "react";
import clsx from "clsx";
import InputCode from "../StepVerifyNumber/InputCode";
import { Layout } from "../../NewLayout/Layout";
import Input from "../../Forms/NewInput/Input";
import { INewStepVerifyPhoneView } from "./types";
import { centeredRoundedChild } from "../../../utils/constants/layoutConfig";
import { ReactComponent as PhoneLock } from "./phoneLock.svg";
import { ReactComponent as Message } from "./message.svg";

const NewStepVerifyPhoneView: React.FC<INewStepVerifyPhoneView> = ({
  code,
  loading,
  onComplete,
  phoneNumber,
  isComplete,
  onWrongNumber,
}) => (
  <Layout
    hideHeader
    className="ni-new-step-instructions"
    classNameContainer="flex flex-1 flex-col justify-center items-center"
    disableNextButton={!isComplete}
    hideNextButton
    hideBackButton
    showTimer={false}
    onlyPrivacy
    additionalFooterElement={
      <button
        className="font-lato text-neutral60 text-center"
        onClick={() => onComplete(123456)}
      >
        <p>Code Received:</p>
        <div className="border-4 border-main-accent font-bold border-dashed">
          <p className="mx-8">123 - 456</p>
        </div>
      </button>
    }
  >
    <img src="/mocks/company.png" alt="company" />
    <div className={clsx(centeredRoundedChild, "pb-6 font-lato")}>
      <Message className="ml-6" />
      <h1 className="font-black text-24/36 mb-[9px] mt-10">Verification</h1>
      <p className="w-[380px] mb-[13px] font-black text-16/19 mx-auto text-grayInfo text-center">
        Please check your text messages, as we have sent the code to
        <span className="text-darkBlue"> {phoneNumber}</span>
      </p>
      <p className="w-[380px] mb-[10px] text-center font-black text-main-accent text-10/12">
        <button onClick={onWrongNumber}>Wrong number?</button>
      </p>
      <Input
        name="code"
        label="CONFIRMATION CODE"
        renderIcon={({ color }) => <PhoneLock fill={color} className="ml-2" />}
        renderInput={({ ref, onChange, onFocus, onBlur, value, onKeyDown }) => (
          <InputCode
            splitNumber={3}
            value={value?.toString()}
            inputRef={ref}
            length={6}
            loading={loading}
            onComplete={(code) => onChange?.(code)}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
        )}
        placeholder="(000) 000-0000"
        autoFocus
        value={code}
        onChange={onComplete}
        classNameContainer="w-[379px]"
      />
      <form className="flex flex-1 flex-row items-center mt-6 justify-center"></form>
      <div className="pt-8">
        <p className="text-linkBlue text-base font-black">
          Didn’t get the code?
        </p>
      </div>
    </div>
  </Layout>
);

export default NewStepVerifyPhoneView;
