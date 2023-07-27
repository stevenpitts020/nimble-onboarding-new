import * as yup from "yup";
import {
  errorEmailBlank,
  errorEmailToMuchCharacters,
} from "../../../../utils/constants/variables";

export const schemaCoApplicant = yup.object().shape({
  documentType: yup.string(),
  email: yup
    .string()
    .required(errorEmailBlank)
    .max(90, errorEmailToMuchCharacters)
    .email()
    .test("globalError", "Do NOT enter your own information here ", (value) => {
      const prospect = sessionStorage.getItem("PROSPECT");
      return value !== JSON.parse(prospect as string).signer.email;
    }),
  phoneNumber: yup
    .string()
    .max(20, "Phone Number can’t have more than 20 characters"),
  ein: yup.string().max(10, "EIN can’t have more than 10 characters"),
});
export const schemaCoGuaranty = yup.object().shape({
  documentType: yup.string(),
  email: yup
    .string()
    .required(errorEmailBlank)
    .max(90, errorEmailToMuchCharacters)
    .email()
    .test("globalError", "Do NOT enter your own information here ", (value) => {
      const prospect = sessionStorage.getItem("PROSPECT");
      return value !== JSON.parse(prospect as string).signer.email;
    }),
  phoneNumber: yup
    .string()
    .max(20, "Phone Number can’t have more than 20 characters"),

  ein: yup.string().max(10, "EIN can’t have more than 10 characters"),
  guaranty: yup.string().required("EIN can’t be blank"),
  ownership: yup.string().required("EIN can’t be blank"),
});
