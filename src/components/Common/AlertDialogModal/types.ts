export interface IAlertDialogModal {
  title: string;
  isOpen: boolean;
  onCancel?: () => void;
  onAction: () => void;
  className?: string;
}
export interface IAlertDialogButtons {
  onCancel?: () => void;
  onAction: () => void;
  className?: string;
}
