import * as yup from "yup";
import {
  errorEmailBlank,
  errorEmailToMuchCharacters,
  errorEmailValid,
} from "../../../utils/constants/variables";

const schema = yup.object().shape({
  documentType: yup.string(),
  email: yup
    .string()
    .required(errorEmailBlank)
    .max(90, errorEmailToMuchCharacters)
    .email(errorEmailValid),
});
export default schema;
