import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Icon from "react-feather";
import * as _ from "lodash";
import { log } from "../../../services";
import FormatHelper from "../../../utils/FormatHelper";
import STATES from "../../../utils/constants/states";
import countries from "../../../utils/constants/countries";
import schema from "./SignerSchema";
import { IProspectForm } from "./types";
import { ISignerDetails } from "../../../store/reducers/type";
import Input from "../Input/Input";
import InputWithMask from "../InputWithMask/InputWithMask";
import Dropdown from "../Dropdown/Dropdown";

// We want to track these values in order to avoid unnecessary duplicate checks to the backend
let lastSSNValue = "";
let lastSSNValid = false;
let lastPhoneNumberValue = "";
let lastPhoneNumberValid = false;

const ProspectForm: FC<IProspectForm> = (props) => {
  // destructure default values
  const { defaultValues, onValidate, onSubmit, invitee } = props;
  const signerId: string = props.signerId || "UNKNOWN";
  if (defaultValues) {
    defaultValues.ssn = defaultValues.ssn || "";
    defaultValues.phoneNumber = defaultValues.phoneNumber || "";
  }

  const addFormValueIfPresent = (
    fieldName: string,
    data: object,
    asDate = false
  ) => {
    if (getValues(fieldName) !== "") {
      _.set(
        data,
        fieldName,
        asDate
          ? FormatHelper.strDateFormat(getValues(fieldName))
          : getValues(fieldName)
      );
    }
  };
  const getValidationData = () => {
    // Copy data from form for validation
    const data = {
      id: signerId,
      documentIssuer:
        getValues().documentType === "PASSPORT"
          ? FormatHelper.countryNameToIso(getValues().documentIssuer)
          : getValues().documentIssuer,
    };
    addFormValueIfPresent("firstName", data);
    addFormValueIfPresent("middleName", data);
    addFormValueIfPresent("lastName", data);
    addFormValueIfPresent("dateOfBirth", data, true);
    addFormValueIfPresent("address", data);
    addFormValueIfPresent("city", data);
    addFormValueIfPresent("state", data);
    addFormValueIfPresent("zipCode", data);
    addFormValueIfPresent("phoneNumber", data);
    addFormValueIfPresent("ssn", data);
    addFormValueIfPresent("documentType", data);
    addFormValueIfPresent("documentNumber", data);
    addFormValueIfPresent("documentExpirationDate", data, true);
    addFormValueIfPresent("documentIssuedDate", data, true);
    addFormValueIfPresent("email", data);
    addFormValueIfPresent("employer", data);
    addFormValueIfPresent("selfieDocumentId", data);
    addFormValueIfPresent("consent", data);
    return data;
  };

  const checkDuplicates = async () => {
    const validationData = getValidationData();

    try {
      return await onValidate(validationData as ISignerDetails);
    } catch (error) {
      console.error("Unknown failed!!!", error);
      log.error(JSON.stringify(error), "Unknown failed!!!");
      return false;
    }
  };

  const checkResultsForDupe = (results: any, key: any) => {
    if (results && results[signerId] && results[signerId][key]) {
      return false;
    }
    return true;
  };

  schema.fields.ssn = schema.fields.ssn.test({
    name: "checkDuplicateSSN",
    message: "SSN not unique across application Signers",
    exclusive: true,
    test: async (value) => {
      const parsedVal = value ? value.replace(/_/g, "").replace(/-/g, "") : "";
      // Avoid validating partial values as they are being typed
      if (value && parsedVal.length === 9 && value !== lastSSNValue) {
        const results = await checkDuplicates();
        lastSSNValue = value;
        lastSSNValid = checkResultsForDupe(results, "ssn");
        return lastSSNValid;
      }
      if (
        value &&
        lastSSNValue &&
        value === `${lastSSNValue.substring(0, lastSSNValue.length - 1)}_`
      ) {
        // we want to rearm dupe checks if the user starts changing after previously validated
        lastSSNValue = "";
        return false;
      }
      if (value === lastSSNValue) {
        return lastSSNValid;
      }
      return true;
    },
  });
  schema.fields.phoneNumber = schema.fields.phoneNumber.test({
    name: "checkDuplicatePhoneNumber",
    message: "Phone number not unique across application Signers",
    exclusive: true,
    test: async (value) => {
      const matches =
        (value || "").match(/\([2-9]\d{2}\) [2-9]\d{2}-\d{4}/) || [];
      // Avoid validating partial values as they are being typed
      if (
        value &&
        value.length <= 20 &&
        matches.length &&
        value !== lastPhoneNumberValue
      ) {
        const results = await checkDuplicates();
        lastPhoneNumberValue = value;
        lastPhoneNumberValid = checkResultsForDupe(results, "phoneNumber");
        return lastPhoneNumberValid;
      }
      if (
        value &&
        lastPhoneNumberValue &&
        value ===
          `${lastPhoneNumberValue.substring(
            0,
            lastPhoneNumberValue.length - 1
          )}_`
      ) {
        // we want to rearm dupe checks if the user starts changing after previously validated
        lastPhoneNumberValue = "";
        return false;
      }
      if (value === lastPhoneNumberValue) {
        return lastPhoneNumberValid;
      }
      return true;
    },
  });
  const { register, handleSubmit, errors, trigger, control, getValues } =
    useForm<ISignerDetails>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });
  // const { loading } = useLoading()
  const documentType = defaultValues?.documentType;
  const issuerOptions = () =>
    documentType === "PASSPORT"
      ? countries.map((country) => `${country.name}`)
      : STATES;
  const getIssuerName = (str: string | undefined) => {
    const country = countries.find((el) => el.isoCode === str);
    // if there's no match return the original string (e.g. the string is a state)
    return documentType === "PASSPORT" && country ? country.name : str;
  };

  React.useEffect(() => {
    let k: keyof ISignerDetails;
    for (k in defaultValues) {
      if (!!defaultValues && defaultValues[k]) {
        trigger(k);
      }
    }
  }, [defaultValues, trigger]);

  const onFormSubmit = async (data: ISignerDetails) => {
    // convert the country name to the isoCode
    if (documentType === "PASSPORT") {
      data.documentIssuer = FormatHelper.countryNameToIso(data.documentIssuer);
    }
    // prepare dates to api

    data.dateOfBirth =
      data.dateOfBirth !== undefined
        ? FormatHelper.strDateFormat(data.dateOfBirth)
        : data.documentIssuedDate;
    data.documentExpirationDate =
      data.documentExpirationDate !== undefined
        ? FormatHelper.strDateFormat(data.documentExpirationDate)
        : data.documentExpirationDate;
    data.documentIssuedDate =
      data.documentIssuedDate !== undefined
        ? FormatHelper.strDateFormat(data.documentIssuedDate)
        : data.documentIssuedDate;
    log.info(JSON.stringify(data), "prospectform");
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div
      data-testid="ProspectForm"
      className={`ni-prospect-form ${props.className}`}
      style={props.style}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <section>
          <aside>
            <Icon.User />
          </aside>
          <div className="grid">
            {/* needed for the documentIssuedDate validation */}
            <input
              name="documentType"
              defaultValue={defaultValues?.documentType?.toString()}
              ref={register}
              type="hidden"
            />
            <Input
              name="firstName"
              label="Legal First Name"
              autocomplete="given-name"
              defaultValue={defaultValues?.firstName}
              className="span-7"
              errors={errors.firstName}
              ref={register}
            />
            <Input
              name="middleName"
              label="Middle Name"
              autoComplete="middle-name"
              defaultValue={defaultValues?.middleName}
              className="span-5"
              errors={errors.middleName}
              ref={register}
            />
            <Input
              name="lastName"
              label="Last Name"
              autoComplete="family-name"
              defaultValue={defaultValues?.lastName}
              className="span-7"
              errors={errors.lastName}
              ref={register}
            />
            <Input
              name="dateOfBirth"
              label="Birth Date"
              placeholder="yyyy-mm-dd"
              autoComplete="bday"
              defaultValue={FormatHelper.strDateFormat(
                defaultValues?.dateOfBirth
              )}
              className="span-5"
              errors={errors.dateOfBirth}
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              max="2999-12-31"
              ref={register}
            />
          </div>
        </section>
        <section>
          <aside>
            <Icon.Mail />
          </aside>
          <div className="grid">
            <Input
              name="email"
              label="Email"
              autoComplete="email"
              type="email"
              defaultValue={defaultValues?.email}
              className="span-8"
              errors={errors.email}
              ref={register}
            />
            <InputWithMask
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              defaultValue={defaultValues?.phoneNumber}
              className="span-4"
              errors={errors.phoneNumber}
              mask="_"
              format="(###) ###-####"
              control={control}
            />
          </div>
        </section>

        <section>
          <aside>
            <Icon.MapPin />
          </aside>
          <div className="grid">
            <Input
              name="address"
              label="Address"
              autoComplete="street-address"
              defaultValue={defaultValues?.address}
              className="span-8"
              errors={errors.address}
              ref={register}
            />
            <Input
              name="city"
              label="City"
              defaultValue={defaultValues?.city}
              className="span-6"
              errors={errors.city}
              ref={register}
            />
            <Dropdown
              name="state"
              label="State"
              defaultValue={defaultValues?.state}
              options={STATES.sort((a, b) => a.length - b.length)}
              className="span-2"
              errors={errors.state}
              ref={register}
            />
            <Input
              name="zipCode"
              label="Zip Code"
              inputMode="numeric"
              type="tel"
              pattern="[0-9]*"
              autoComplete="postal-code"
              defaultValue={defaultValues?.zipCode}
              className="span-4"
              errors={errors.zipCode}
              ref={register}
            />
          </div>
        </section>

        <section>
          <aside>
            <Icon.Lock />
          </aside>
          <div className="grid">
            <Input
              name="documentNumber"
              label="ID Number"
              type="text"
              defaultValue={defaultValues?.documentNumber}
              className="span-4"
              errors={errors.documentNumber}
              ref={register}
            />
            <Input
              name="documentIssuedDate"
              label="ID Issued Date"
              placeholder="yyyy-mm-dd"
              defaultValue={FormatHelper.strDateFormat(
                defaultValues?.documentIssuedDate
              )}
              className="span-4"
              errors={errors.documentIssuedDate}
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              max="2999-12-31"
              ref={register}
            />
            <Input
              name="documentExpirationDate"
              label="ID Expiration Date"
              defaultValue={FormatHelper.strDateFormat(
                defaultValues?.documentExpirationDate
              )}
              className="span-4"
              placeholder="yyyy-mm-dd"
              errors={errors.documentExpirationDate}
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              max="2999-12-31"
              ref={register}
            />
            <Dropdown
              name="documentIssuer"
              label="ID Issued by:"
              defaultValue={getIssuerName(defaultValues?.documentIssuer)}
              options={issuerOptions()}
              className="span-4"
              errors={errors.documentIssuer}
              ref={register}
            />
            <InputWithMask
              name="ssn"
              label="Social Security Number"
              inputMode="numeric"
              type="tel"
              defaultValue={defaultValues?.ssn}
              className="span-4"
              errors={errors.ssn}
              mask="_"
              format="###-##-####"
              control={control}
            />
            <Input
              name="employer"
              label="Present Employer"
              autoComplete="organization-title"
              defaultValue={defaultValues?.employer}
              className="span-4"
              errors={errors.employer}
              ref={register}
            />
          </div>
        </section>

        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="alert toast is-error"
            data-testid="form-errors"
          >
            <Icon.AlertCircle /> Please review the form before continuing.
          </div>
        )}

        <div className="terms-and-continue">
          <button
            className={`button is-pill is-green ${
              !invitee ? "has-icon-after" : ""
            }`}
            data-testid="step-info-continue"
          >
            {!invitee ? (
              <>
                Sign and Finish
                <Icon.ArrowRight />
              </>
            ) : (
              <>
                <Icon.Check /> Continue
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProspectForm;
