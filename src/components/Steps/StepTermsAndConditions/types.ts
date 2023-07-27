import { MouseEventHandler } from "react";
export interface IStepTermsAndConditions {
  activeDisclosure: string;
  setActiveDisclosure: (id: string) => void;
  onConsent?: () => void;
}

export interface ISideMenuItem {
  key: string;
  isActive: boolean;
  setIsActive: MouseEventHandler<HTMLDivElement>;
  disclosure: {
    title: string;
    subtitle: string;
  };
}
