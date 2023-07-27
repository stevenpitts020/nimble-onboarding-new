import { ArrowRight } from "react-feather";
import React, { FC } from "react";
import iconDollarCoin from "./iconDollarCoin.svg";
import iconCursor from "./iconCursor.svg";
import iconSpeechBubble from "./iconSpeechBubble.svg";
import { IFButtonList } from "./types";
import { institution } from "../../services";

const ButtonListView: FC<IFButtonList> = ({
  handleRestart,
  className,
}: IFButtonList) => (
  <div
    className={`button-list ${className} u-margin-top-xl`}
    data-testid="button-list"
  >
    <button
      className="u-margin-top-xl"
      data-testid="requestButton"
      onClick={handleRestart}
    >
      <img src={iconDollarCoin} alt="icon dollar" />
      <label> Request a new deposit account</label>
      <ArrowRight />
    </button>
    <a
      href={`https://www.${institution}`}
      rel="noopener noreferrer"
      data-testid="institutionButton"
    >
      <img src={iconCursor} alt="icon cursor" />
      <label>Discover other products for you</label>
      <ArrowRight />
    </a>
    <a
      target="_blank"
      href="mailto:support@nimblefi.com"
      rel="noopener noreferrer"
      data-testid="supportButton"
    >
      <img src={iconSpeechBubble} alt="icon speech bubble" />
      <label>
        {className === "completed"
          ? "Need help? Talk to us"
          : "Have a question? Talk to us"}
      </label>
      <ArrowRight />
    </a>
  </div>
);
export default ButtonListView;
