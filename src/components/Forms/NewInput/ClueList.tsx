import React from "react";
import clsx from "clsx";
import Clue from "./Clue";
import { IClueList } from "./types";

const ClueList: React.FC<IClueList> = ({ clues, className, isFocused }) => (
  <div className="relative" onClick={(e) => e.stopPropagation()}>
    <div className={clsx("absolute w-full z-10", className)}>
      {clues
        .filter(
          ({ show = true, type }) =>
            (show && isFocused) || (show && !isFocused && type === "error")
        )
        .map(({ renderIcon, text, type, onSelect }, index, showedClues) => (
          <Clue
            key={index}
            renderIcon={renderIcon}
            text={text}
            type={type}
            onSelect={onSelect}
            isLast={index === showedClues.length - 1}
          />
        ))}
    </div>
  </div>
);

export default ClueList;
