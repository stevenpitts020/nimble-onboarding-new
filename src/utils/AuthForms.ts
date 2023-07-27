import _ from "lodash";
import FormatHelper from "./FormatHelper";
import { PASSPORT } from "./constants/variables";

export const getValidationData = (
  signerIdValue: string,
  field: string,
  getValues: any
) => {
  // Copy data from form for validation
  const data = {
    id: signerIdValue,
    documentIssuer:
      getValues().documentType === PASSPORT
        ? FormatHelper.countryNameToIso(getValues().documentIssuer)
        : getValues().documentIssuer,
  };
  addFormValueIfPresent(field, data, false, getValues);
  return data;
};
export const addFormValueIfPresent = (
  fieldName: string,
  data: object,
  asDate = false,
  getValues
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

export const checkResultsForDupe = (
  results: boolean | void,
  key: string,
  signerIdValue: string
) => {
  return !(results && results[signerIdValue] && results[signerIdValue][key]);
};
