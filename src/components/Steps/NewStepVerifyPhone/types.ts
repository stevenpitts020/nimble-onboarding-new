export interface INewStepVerifyPhoneView {
  code: string;
  loading: boolean;
  onComplete: (value: string | number) => void;
  phoneNumber: string;
  isComplete: boolean;
  onWrongNumber: () => void;
  showSidebarTips?: boolean;
}
