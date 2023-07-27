import React from "react";
import * as Icon from "react-feather";
import HelpIcon from "./helpIcon.svg";
import { IFBAButtonView } from "./types";
import Button from "../Common/Button/Button";

const FabHelpButtonView = ({
  isAtBottom,
  show,
  newRef,
  isOpen,
  toggleHelp,
}: IFBAButtonView) => (
  <div
    className={`fabContainer ${isAtBottom ? "bottom" : ""} ${
      show ? "" : "hide"
    }`}
    ref={newRef}
    data-testid="fab-container"
  >
    <div
      className={`helpContent ${isOpen ? "visible" : ""}`}
      data-testid="fab-help-content"
    >
      <div>
        <h2>Need Help?</h2>
        <p>
          If you have questions or issues just reach out to our customer
          service.
        </p>
      </div>
      <h3>
        <Icon.Mail />
        support@nimblefi.com
      </h3>
      <h3>
        <Icon.Phone />
        (515) 222-1144
      </h3>
    </div>

    <Button
      onClick={toggleHelp}
      className="button is-blue fab"
      data-testid="fab-help-button"
    >
      {isOpen ? (
        <div>
          <Icon.X size={32} /> <p className="screen-reader">Close help</p>
        </div>
      ) : (
        <div>
          <img src={HelpIcon} width={32} height={32} alt="help icon" />
          <p className="screen-reader">Open help</p>
        </div>
      )}
    </Button>
  </div>
);

export default FabHelpButtonView;
