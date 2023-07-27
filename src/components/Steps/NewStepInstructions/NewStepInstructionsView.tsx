import React, { useEffect } from "react";
import clsx from "clsx";
import { Layout } from "../../NewLayout/Layout";
import { INewStepInstructionsView } from "./types";
import { centeredRoundedChild } from "../../../utils/constants/layoutConfig";
import "./NewStepInstructions.sass";
import Input from "../../Forms/NewInput/Input";
import NumberFormat from "react-number-format";
import { ReactComponent as Phone } from "./icon/Phone.svg";
import { Controller } from "react-hook-form";
import FakePlaceholder from "./components/FakePlaceholder";
import { authService } from "../../../services";

const NewStepInstructionsView: React.FC<INewStepInstructionsView> = ({
  control,
  onGetStarted,
  disableGetStarted,
  clues,
  goToTerms,
}) => {
  const footerButton = (
    <button
      disabled={disableGetStarted}
      className={clsx(
        "px-[30px] py-[14px] rounded-[12px] text-white font-inter font-bold text-18/23",
        disableGetStarted ? "bg-neutral30" : "bg-main-accent"
      )}
      onClick={onGetStarted}
    >
      I have reviewed all disclosures & I consent!
    </button>
  );
  useEffect(() => {
    const token = authService.getAccessToken();
    Promise.all([
      authService.getMe(token),
      authService.getAccountRequest(token),
    ])
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  return (
    <Layout
      dataTestId="NewStepInstructions"
      className="ni-new-step-instructions"
      classNameContainer="flex flex-1 flex-col justify-center items-center pb-[140px]"
      onGetStarted={onGetStarted}
      disableGetStarted={disableGetStarted}
      disableNextButton={disableGetStarted}
      additionalFooterElement={footerButton}
      hideBackButton
      hideNextButton
      showTimer={false}
      onClickNext={onGetStarted}
      hideHeader
      onlyPrivacy
    >
      <img src="/mocks/company.png" alt="company" />
      <div className={clsx(centeredRoundedChild, "pb-5 pt-5")}>
        <div>
          <h1 className="text-neutral100 text-56/120% font-bold font-lora">
            Financial Industry’s <br />
            <span className="text-main-accent">Leading Onboarding</span>
          </h1>
          <p className="mt-5 font-archivo text-neutral80">
            Central Bank aims to deliver premiere experience for our customers
            and
            <br />
            prospects, please start by providing your cell phone number below.
          </p>
        </div>
        <div className="w-[340px] mt-7">
          <Controller
            control={control}
            name="phoneNumber"
            render={({ onChange, value, name }) => (
              <Input
                name={name}
                label="CELL PHONE NUMBER"
                renderIcon={({ color }) => <Phone fill={color} />}
                isFromCache
                renderInput={({
                  ref,
                  onChange,
                  value,
                  className,
                  placeholder,
                  ...inputProps
                }) => (
                  <div className="relative flex flex-1 flex-col">
                    <NumberFormat
                      {...inputProps}
                      className={clsx(
                        className,
                        "text-transparent caret-black"
                      )}
                      value={value}
                      onValueChange={({ formattedValue }) =>
                        onChange?.(formattedValue)
                      }
                      getInputRef={(elm) => (ref.current = elm)}
                      format="(###) ###-####"
                    />
                    <FakePlaceholder placeholder={placeholder} value={value} />
                  </div>
                )}
                tooltip="By providing your phone number you agree that it may be used to authenticate your account."
                example="(123) 456-7890"
                placeholder="(000) 000-0000"
                autoFocus
                clues={clues}
                value={value}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </div>
        <div className="text-neutral60 mt-14 text-14/120%">
          <button onClick={goToTerms}>
            By clicking “Get started” I consent to <u>privacy policy</u>,{" "}
            <u>terms and</u>
            <br />
            <u>conditions</u>, and <u>e-communication</u> disclosures.
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewStepInstructionsView;
