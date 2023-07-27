import React from "react";
import Logo from "../Logo/Logo";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import { IHeaderView } from "./types";
import Button from "../../Common/Button/Button";
import AlertDialogModal from "../../Common/AlertDialogModal/AlertDialogModal";

const HeaderView = ({
  props,
  onGoToStart,
  institution,
  stepsWithTimer,
  currentStep,
  twoDigits,
  isOpen,
  onCancel,
  onAction,
}: IHeaderView) => (
  <header
    data-testid="header"
    className={`ni-header ${props.className}`}
    style={props.style}
  >
    <Button onClick={onGoToStart} className="ni-logo is-ghost">
      <Logo
        url={institution?.logoUri?.default || ""}
        alt={`${institution?.name} logo`}
      />
    </Button>
    {stepsWithTimer.includes(currentStep) && (
      <TimerDisplay twoDigits={twoDigits} />
    )}
    <AlertDialogModal
      isOpen={isOpen}
      onCancel={onCancel}
      onAction={onAction}
      title="Are you sure? This will start a new account opening process?"
    />
  </header>
);

export default HeaderView;
