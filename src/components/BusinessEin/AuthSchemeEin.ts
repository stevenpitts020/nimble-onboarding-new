import * as yup from "yup";

const schema = yup.object().shape({
  documentType: yup.string(),
  ein: yup
    .string()
    .required("EIN can’t be blank")
    .max(10, "EIN can’t have more than 10 characters")
    .matches(/\d{2}-\d{7}/, "Invalid EIN"),
});
export default schema;
