import { DeepMap, FieldError } from "react-hook-form";
import { IInvitedSigner } from "../../../../store/reducers/type";

export interface IFormRepeatableSigners {
  signers: IInvitedSigner[];
  role?: string;
}

export interface IRepeatableSigner {
  register: any;
  item: IInvitedSigner;
  index: number;
  errors: DeepMap<IFormRepeatableSigners, FieldError>;
  onRemove: (index: number) => void;
  onRoleChange: () => void;
  roleDisabled: boolean;
  trigger: (payload?: string | string[]) => Promise<boolean>;
}
