import * as yup from "yup";

const schema = yup.object().shape({
  documentType: yup.string(),
  phoneNumber: yup
    .string()
    .required("Phone Number can’t be blank")
    .max(20, "Phone Number can’t have more than 20 characters")
    .matches(
      /\([2-9]\d{2}\) [2-9]\d{2}-\d{4}/,
      "Check if you provided the correct details"
    ),
});
export default schema;
