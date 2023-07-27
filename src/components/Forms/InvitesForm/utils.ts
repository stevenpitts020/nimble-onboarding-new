import FormatHelper from "../../../utils/FormatHelper";
import { IFormRepeatableSigners } from "./RepeatableSigner/types";

const cleanEmptyEmails = (data: IFormRepeatableSigners) => {
  const notEmptyEmails = data.signers.filter(
    (signer) => !FormatHelper.isEmpty(signer.email)
  );
  return { signers: notEmptyEmails };
};

const checkRepeatedEmails = (
  data: IFormRepeatableSigners,
  disallowedEmails?: string[]
) => {
  // get all emails from signers
  let emails: string[] = data.signers.map((li) => li.email);
  // get email from signer
  if (disallowedEmails) {
    emails = emails.concat(disallowedEmails);
  }

  // transform into a set
  // If the length of the Set and the array are not the same
  // this function will return true, indicating that the array did contain duplicates
  return new Set(emails).size !== emails.length;
};

export { cleanEmptyEmails, checkRepeatedEmails };
