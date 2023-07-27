import FormatHelper from "../FormatHelper";
import { IFormRepeatableSigners } from "../../components/Forms/InvitesForm/RepeatableSigner/types";

/**
 * Validate if we have at least one signer
 * @param data - IFormRepeatableSigners
 */
const validateNumberSigners = (
  data: IFormRepeatableSigners
): boolean | string => {
  const { signers } = data;
  return !FormatHelper.isEmpty(signers);
};
export default validateNumberSigners;
