import moment from "moment";
import countries from "./constants/countries";

/**
 * This file contains basic format helpers to be reused in views or components
 *
 * Use it to DRY your code. Peace.
 * ex: Helpers.dateFormat(20);
 */
const FormatHelper = {
  /* Check if standard date is valid or not */
  isValidDate: (someDateString: string | undefined, divider = "-") => {
    if (someDateString === undefined) {
      return false;
    }
    let format = `YYYY${divider}MM${divider}DD`;

    // catch some edge cases from returned api values like 1998-1-20
    if (someDateString.length === 9) {
      format = `YYYY${divider}M${divider}DD`;
    }

    const utc = moment(someDateString, format, true);
    return utc.isValid();
  },

  /* Output to 'MM/DD/YYYY' string */
  strDateFormat: (someDateString: string | undefined) => {
    if (someDateString === undefined) {
      return undefined;
    }
    return moment(someDateString).format("YYYY-MM-DD");
  },

  /* Output to 'MM/DD/YYYY' string */
  dateFormat: (date: Date, divider = "/") =>
    moment(date).format(`MM${divider}DD${divider}YYYY`),

  /* output to 'MONTH, DAY, YEAR' */
  dateFormatExtended: (date: Date) => moment(date).format("MMMM DD, YYYY"),

  /* Output to Hours, minutes and seconds */
  durationFormat: (time: string) => {
    const date = moment.duration(time, "s");
    const hrs = date.hours();
    const mins = date.minutes();

    let ret = "";
    if (hrs > 0) {
      ret += `${hrs}h `;
    }
    ret += `${mins}min`;
    return ret;
  },

  /* get 'x days ago' date formatted */
  fromNow: (date: Date) => {
    const momentDate = moment(date);
    const windowDate = moment().subtract(7, "days");
    if (momentDate.isAfter(windowDate)) {
      return momentDate.fromNow();
    }
    return FormatHelper.dateFormat(date);
  },

  /** is it empty */
  isEmpty(value: any) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  },
  /* convert $1,234,431 to 1234431 */
  numberToCurrency: (currency: string) => Number(currency.replace(/[$,]/g, "")),
  parseFirstAndMiddleName: (joinedName: {
    firstName: string | undefined;
    middleName: string;
  }) => {
    const parsedName = {
      firstName: "",
      middleName: "",
    };
    if (typeof joinedName.firstName !== "string") {
      return parsedName;
    }
    // check if the firstName contains 2 names, ex: 'Rick James'
    // check if the firstName contains 3 names, ex: 'Maria de Lurdes'
    const splitName = joinedName.firstName.split(" ");
    switch (splitName.length) {
      case 3:
        parsedName.firstName = splitName[0];
        parsedName.middleName = `${splitName[1]} ${splitName[2]}`;
        break;
      case 2:
        parsedName.firstName = splitName[0];
        parsedName.middleName = splitName[1];
        break;
      default:
        parsedName.firstName = splitName[0];
    }
    // https://gitlab.com/wearesingular/clients/nimble/nimble-onboarding/-/issues/128
    // some barcodes have the middlename with the value none
    if ((parsedName.middleName || "").toLowerCase().trim() === "none") {
      parsedName.middleName = "";
    }
    return parsedName;
  },
  capitalize: (s: string) => {
    const splitStr = s.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  },
  parseFullAddress: (result: any) => {
    let userAdressFields = {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    };

    if (!result?.address) {
      return userAdressFields;
    }
    // check for at least one property
    if (
      result.barcode &&
      result.barcode.addressDetailedInfo &&
      result.barcode.addressDetailedInfo.street !== ""
    ) {
      return (userAdressFields = {
        address: result.barcode.addressDetailedInfo.street,
        city: result.barcode.addressDetailedInfo.city,
        state: result.barcode.addressDetailedInfo.jurisdiction,
        zipCode: result.barcode.addressDetailedInfo.postalCode,
      });
    }
    // parse Street
    const fullAddress = result.address;
    const splitAddress = fullAddress.split("\n");
    if (splitAddress.length > 1) {
      userAdressFields.address = splitAddress[0];
      // parse City State Zip
      const comma = splitAddress[1].indexOf(",");
      if (comma > 0) {
        // Pull out the city.
        userAdressFields.city = splitAddress[1].slice(0, comma);
        // Get everything after the city.
        // The string after the comma, +1 so that we skip the comma
        const after = splitAddress[1].substring(comma + 1);
        // Find the space.
        const space = after.lastIndexOf(" ");
        if (space > 0) {
          // Pull out the state.
          userAdressFields.state = after.slice(0, space).trim();
          // Pull out the zip code.
          userAdressFields.zipCode = after.substring(space + 1);
        } else {
          // The string after the comma, +2 so we get the state
          userAdressFields.state = after.trim().slice(0, 2);
        }
      } else {
        userAdressFields.city = splitAddress[1];
      }
    } else {
      userAdressFields.address = fullAddress;
    }
    return userAdressFields;
  },
  stringToCamelCase: (str: string) =>
    str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) {
        return "";
      }
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    }),
  countryNameToIso: (name: string | undefined) => {
    const country = countries.find((el) => el.name === name);
    return country ? country.isoCode : name;
  },
  parseDateString: (_value: Date, originalValue: string | Date) =>
    originalValue === "" ? null : moment(originalValue).toDate(),
  currencyUSAFormat: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
};
export default FormatHelper;
