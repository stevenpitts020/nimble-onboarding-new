import React from "react";
import { ISignerDetails } from "../../../store/reducers/type";

export interface IProspectForm {
  className?: string;
  style?: React.CSSProperties;
  defaultValues?: ISignerDetails;
  signerId?: string;
  onValidate: (data: ISignerDetails) => void;
  onSubmit?: (data: ISignerDetails) => void;
  invitee?: boolean;
}
