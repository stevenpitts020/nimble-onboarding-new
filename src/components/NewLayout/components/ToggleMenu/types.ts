export interface IToggleMenu {
  open: boolean;
  toggleMenu: () => void;
  className?: string;
  children?: React.ReactNode;
  menuPosition?: string;
}
