import * as yup from "yup";
import moment from "moment";
import FormatHelper from "../../../utils/FormatHelper";

const schema = yup.object().shape({
  documentType: yup.string(),
  firstName: yup
    .string()
    .required("First Name can’t be blank")
    .min(2, "First Name can’t have less than 2 characters")
    .max(100, "First Name can’t have more than 100 characters")
    .test(
      "firstName",
      "Invalid First Name",
      (value) => !!(value && value.trim().length >= 2)
    ),
  middleName: yup
    .string()
    .max(100, "Middle Name can’t have more than 100 characters"),
  lastName: yup
    .string()
    .required("Last Name can’t be blank")
    .min(2, "Last Name can’t have less than 2 characters")
    .max(100, "Last Name can’t have more than 100 characters")
    .test(
      "lastName",
      "Invalid Last Name",
      (value) => !!(value && value.trim().length >= 2)
    ),
  dateOfBirth: yup
    .date()
    .nullable()
    .default(null)
    .transform(FormatHelper.parseDateString)
    .required("Birth Date can’t be blank")
    .test("dateOfBirth", "You must be older than 18", (value) =>
      value !== null ? moment().diff(moment(value), "years") >= 18 : false
    )
    // tests if we applied a default date
    .test(
      "dateOfBirth",
      "Invalid Birth Date",
      (value) => moment(value).format("YYYY-MM-DD") !== "1900-01-01"
    ),
  email: yup
    .string()
    .required("Email can’t be blank")
    .max(90, "Email can’t have more than 90 characters")
    .email(),
  phoneNumber: yup
    .string()
    .required("Phone Number can’t be blank")
    .max(20, "Phone Number can’t have more than 20 characters")
    .matches(/\([2-9]\d{2}\) [2-9]\d{2}-\d{4}/, "Invalid phone number"),
  address: yup
    .string()
    .required("Address can’t be blank")
    .max(100, "Address can’t have more than 100 characters"),
  city: yup
    .string()
    .required("City can’t be blank")
    .min(3, "City must be at least 3 characters")
    .max(100, "City can’t have more than 100 characters")
    .test(
      "city",
      "Invalid City",
      (value) => !!(value && value.trim().length >= 3)
    ),
  state: yup.string().required("State can’t be blank"),
  zipCode: yup
    .string()
    .required("Zip Code can’t be blank")
    .min(5, "Zip Code must be at least 5 characters")
    .max(40, "Zip can’t have more than 40 characters")
    .matches(/^\d+$/, "Zip Code must be a number"),
  documentNumber: yup
    .string()
    .required("Driver’s Licence can’t be blank")
    .min(6, "Can’t have less than 6 characters")
    .max(100, "Driver’s Licence can’t have more than 100 characters"),
  documentIssuedDate: yup
    .date()
    .nullable()
    .default(null)
    .transform(FormatHelper.parseDateString)
    .required("ID Issued Date can’t be blank")
    // tests if we applied a default date
    .test(
      "documentIssuedDate",
      "Invalid ID Issued Date",
      (value) => moment(value).format("YYYY-MM-DD") !== "1900-01-01"
    )
    .when("documentType", {
      is: "USDL",
      then: yup
        .date()
        .nullable()
        .default(null)
        .transform(FormatHelper.parseDateString)
        .test(
          "documentIssuedDate",
          "You must be older than 16 when you got your driver license",
          function checkYears(value) {
            return value !== null && this.parent.dateOfBirth
              ? moment(value).diff(moment(this.parent.dateOfBirth), "years") >=
                  16
              : true;
          }
        ),
    }),
  documentExpirationDate: yup
    .date()
    .nullable()
    .transform(FormatHelper.parseDateString)
    .required("ID Expiration Date can’t be blank")
    .min(
      moment().toDate(),
      "Please give us an updated ID card or Passport that is not expired"
    ),
  documentIssuer: yup.string().required("ID issuer can’t be blank"),
  ssn: yup
    .string()
    .required("SSN can’t be blank")
    .test("ssn", "SSN must be 9 characters", (val) => {
      const parsedVal = val ? val.replace(/_/g, "").replace(/-/g, "") : "";
      return parsedVal.length === 9;
    }),
  employer: yup
    .string()
    .required("Present Employer can’t be blank")
    .max(100, "Present Employer can’t have more than 100 characters")
    .test(
      "employer",
      "Invalid Employer",
      (value) => !!(value && value.trim().length >= 2)
    ),
});
export default schema;
