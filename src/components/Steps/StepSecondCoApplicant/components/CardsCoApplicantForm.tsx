import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCoApplicant, schemaCoGuaranty } from "./schemaCoApplicant";
import Input from "../../../Forms/NewInput/Input";
import { ReactComponent as Email } from "../../NewStepAuthenticationEmail/email.svg";
import { ReactComponent as Guaranty } from "./svg/guaranty.svg";
import useEmailAutocomplete from "../../../../hooks/useEmailAutocomplete";
import useEmailClues from "../../NewStepAuthenticationEmail/UseEmailClues";
import { ReactComponent as Phone } from "../../NewStepInstructions/icon/Phone.svg";
import NumberFormat from "react-number-format";
import usePhoneClues from "../../NewStepInstructions/UsePhoneClues";
import useEinClues from "./useEinClues";

const CardsCoApplicantForm = ({
  onSubmit,
  onError,
  data,
  deleteHandler,
  isIndividualOrBusiness,
  guaranty,
  ownership,
}) => {
  const { handleSubmit, errors, control, getValues, setValue, watch } = useForm(
    {
      resolver: yupResolver(guaranty ? schemaCoGuaranty : schemaCoApplicant),
      mode: "onSubmit",
    }
  );

  const onApplySuggestion = useCallback(
    (domain) => {
      const email = getValues("email");
      const newEmail = email?.split("@")[0] + "@" + domain;
      setValue("email", newEmail);
    },
    [setValue, getValues]
  );

  const watchEmail = watch("email");
  const recommendationDomains = useEmailAutocomplete(watchEmail);

  const { clues } = useEmailClues(
    watchEmail,
    errors.email,
    recommendationDomains,
    onApplySuggestion
  );

  const phoneNumber = watch("phoneNumber");

  const phoneClues = usePhoneClues(phoneNumber, errors.phoneNumber);
  const ein = watch("ein");
  const einClues = useEinClues(
    ein,
    errors.ein,
    !!(ein && ein.replaceAll("-", "").length >= 10)
  );
  return (
    <div>
      <form
        className="w-full"
        id="addCoApplicant"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Controller
          control={control}
          name="email"
          render={({ onChange, value, name }) => (
            <Input
              name={name}
              label="E-MAIL"
              renderIcon={({ color }) => <Email fill={color} />}
              example="name@website.com"
              placeholder="name@website.com"
              autoFocus
              clues={clues}
              value={value}
              onChange={(value) => onChange(value)}
              // onPressEnter={onPressEnterInput}
            />
          )}
        />
        <div className="mt-[50px]">
          {isIndividualOrBusiness === "Business" ? (
            <Controller
              control={control}
              name="ein"
              render={({ onChange, value, name }) => (
                <Input
                  name={name}
                  label="EIN"
                  renderIcon={({ color }) => <Phone fill={color} />}
                  renderInput={({ ref, onChange, ...inputProps }) => (
                    <NumberFormat
                      {...inputProps}
                      onValueChange={({ formattedValue }) =>
                        onChange?.(formattedValue)
                      }
                      getInputRef={(elm) => (ref.current = elm)}
                      format="##-#######"
                    />
                  )}
                  example="12-3456789"
                  placeholder="00-0000000"
                  clues={einClues}
                  value={value}
                  onChange={(value) => onChange(value)}
                />
              )}
            />
          ) : (
            <Controller
              control={control}
              name="phoneNumber"
              render={({ onChange, value, name }) => (
                <Input
                  name={name}
                  label="CELL PHONE NUMBER (Optional)"
                  renderIcon={({ color }) => <Phone fill={color} />}
                  renderInput={({ ref, onChange, ...inputProps }) => (
                    <NumberFormat
                      {...inputProps}
                      onValueChange={({ formattedValue }) =>
                        onChange?.(formattedValue)
                      }
                      getInputRef={(elm) => (ref.current = elm)}
                      format="(###) ###-####"
                      mask="_"
                    />
                  )}
                  example="(123) 456-7890"
                  placeholder="(000) 000-0000"
                  clues={phoneClues}
                  value={value}
                  onChange={(value) => onChange(value)}
                />
              )}
            />
          )}
        </div>
        <div className="grid grid-cols-2 max-w-fit gap-[30px] mt-[40px]">
          {guaranty && (
            <Controller
              control={control}
              name="guaranty"
              render={({ onChange, value, name }) => (
                <Input
                  name={name}
                  label="Guaranty (%)"
                  renderIcon={({ color }) => <Guaranty fill={color} />}
                  example="Example: 22,6%"
                  placeholder="22,6%"
                  value={value}
                  onChange={(value) => onChange(value)}
                  // onPressEnter={onPressEnterInput}
                />
              )}
            />
          )}
          {ownership && (
            <Controller
              control={control}
              name="ownership"
              render={({ onChange, value, name }) => (
                <Input
                  name={name}
                  label="Ownership (%)"
                  renderIcon={({ color }) => <Email fill={color} />}
                  example="Example: 22,6%"
                  placeholder="22,6%"
                  value={value}
                  onChange={(value) => onChange(value)}
                  // onPressEnter={onPressEnterInput} //TODO use clues for it
                />
              )}
            />
          )}
        </div>
        <div className="flex">
          {guaranty ? (
            <button
              type="submit"
              disabled={
                Object.keys(errors).length > 0 ||
                !watchEmail ||
                !getValues("guaranty") ||
                !getValues("ownership")
              }
              className="text-center min-w-[141px] bg-darkerBlue mx-auto mt-[58px] disabled:bg-lightGraySecond border-0 text-white disabled:border disabled:border-lightGrayThird disabled:text-lightGrayThird py-3 px-4 rounded-lg shadow-card hover:darkestSecond "
            >
              Add +
            </button>
          ) : (
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || !watchEmail}
              className="text-center min-w-[141px] bg-darkerBlue mx-auto mt-[58px] disabled:bg-lightGraySecond border-0 text-white disabled:border disabled:border-lightGrayThird disabled:text-lightGrayThird py-3 px-4 rounded-lg shadow-card hover:darkestSecond "
            >
              Add +
            </button>
          )}
        </div>
      </form>
      {data.length > 0 && (
        <div>
          {" "}
          <div
            className={"mt-[71px] absolute left-1/2 transform -translate-x-1/2"}
          >
            <h1 className={"font-black text-xl"}>Added</h1>
          </div>
          <div className="absolute rounded-2xl w-[547px] mt-[120px] px-[48px] bg-white left-0 pb-4">
            {data.map((coApplicant) => (
              <div
                key={coApplicant.id}
                className="grid grid-cols-3 mt-[42px] align-top"
              >
                <div className={"relative"}>
                  <p
                    className={
                      "absolute -top-6 text-grayChateau text-[10px] uppercase"
                    }
                  >{`${coApplicant.isIndividualOrBusiness}/${coApplicant.isCoApplicantOrGuarantor}`}</p>
                  <p className="text-darkerBlue font-bold">
                    {coApplicant.email}
                  </p>
                  {coApplicant.guaranty && (
                    <p className="text-darkerBlue font-bold">{`Guaranty ${coApplicant.guaranty}%`}</p>
                  )}
                  {coApplicant.ownership && (
                    <p className="text-darkerBlue font-bold">{`Ownership ${coApplicant.ownership}%`}</p>
                  )}
                </div>
                <p className="text-darkerBlue font-bold mx-auto">
                  {coApplicant.phoneNumber}
                </p>
                <div className={"flex justify-end gap-[19px]"}>
                  <button className="outline-none bg-transprent font-bold text-main-accent focus:outline-none h-0">
                    Sent
                  </button>
                  <button
                    className={
                      "outline-none bg-transprent font-bold text-apricot focus:outline-none  h-0"
                    }
                    onClick={() => deleteHandler(coApplicant.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardsCoApplicantForm;
