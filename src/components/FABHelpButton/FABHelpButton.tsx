import React, { useState, useRef, useEffect } from "react";
import DetectClickOutside from "./ClickOutside";
import "./fab-help-button.sass";
import FabHelpButtonView from "./FABHelpButtonView";
import { IFBAButton } from "./types";

const FABHelpButton: React.FC<IFBAButton> = (props: IFBAButton) => {
  const { show } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  useEffect(() => {
    // on some devices the fab is preventing the user from reaching the privacy button in the app footer
    // this aims to change the position of the fab when scrolled all the way to the bottom allowing access
    // to the app footer
    const scrolledToBottom = () => {
      const windowHeight = window.innerHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };
    window.addEventListener("scroll", scrolledToBottom);
  }, [isAtBottom, setIsAtBottom]);

  // closes the fab component if a click outside is detected
  DetectClickOutside(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  const toggleHelp = () => {
    setIsOpen(!isOpen);
  };
  return (
    <FabHelpButtonView
      isAtBottom={isAtBottom}
      newRef={ref}
      toggleHelp={toggleHelp}
      isOpen={isOpen}
      show={show}
    />
  );
};
export default FABHelpButton;
