import { IPersonalInfoItem } from "../../../store/PersonalInfo/types";

export default interface IScanResult {
  image: string;
  documentId: string;
  goToNextStep: () => void;
}

export interface IInputCode {
  value?: string;
  length: number;
  loading: boolean;
  onComplete: (value: string) => void;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.SyntheticEvent<EventTarget & HTMLInputElement>) => void;
}

export interface ISideBar {
  isShow: boolean;
}

export interface ISideBarItem {
  item: IPersonalInfoItem;
  isFirst: boolean;
}
