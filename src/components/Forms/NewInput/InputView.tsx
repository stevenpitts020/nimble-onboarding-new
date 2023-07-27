import React, { useMemo } from "react";
import { IInputView } from "./types";
import clsx from "clsx";
import ClueList from "./ClueList";
import Tooltip from "./Tooltip";

const ICON_COLOR = {
  disable: "#A3AAB5",
  active: "#0B73EB",
  error: "#D93535",
};

const InputView: React.FC<IInputView> = ({
  props: {
    label,
    renderIcon,
    renderInput,
    example,
    placeholder,
    autoFocus,
    clues,
    value,
    name,
    classNameContainer,
    cluesClassName,
    tooltip,
    error,
  },
  inputRef,
  onClickInput,
  onFocus,
  onBlur,
  isFocused,
  onKeyDown,
  onChange,
  isFromCache,
}) => {
  const inputProps = {
    ref: inputRef,
    className: clsx(
      "focus:outline-none font-inter text-14 text-darkBlue w-full caret-black"
    ),
    placeholder,
    autoFocus,
    onFocus,
    onBlur,
    value,
    onChange,
    name,
    onKeyDown,
  };

  const isClue = useMemo(() => clues?.some(({ show = true }) => show), [clues]);

  const isError = useMemo(
    () =>
      clues
        ?.filter(({ show = true }) => show)
        .some(({ type }) => type === "error"),
    [clues]
  );

  return (
    <div
      className={clsx(
        "text-left font-inter text-grayChateau relative",
        classNameContainer
      )}
    >
      <label>
        {/* {label && (
          <p
            className={clsx(
              "py-1 px-3 ml-12 text-12 relative top-[9px] border-grayChateau text-grayChateau rounded border inline bg-white",
              {
                "text-main-accent border-main-accent": isFocused && !isError,
                "text-error border-error": isError,
              }
            )}
          >
            {label}
          </p>
        )} */}
        <div
          className={clsx("rounded-t-full", {
            "bg-main-accent": isFocused && isClue && !isError,
            "bg-error": isError,
          })}
        >
          <div
            className={clsx(
              "w-full text-left border border-grayChateau rounded py-[5px] pr-4 flex items-center bg-white cursor-pointer height-45",
              {
                "pl-5": !renderIcon,
                // "border-main-accent": isFocused && !isError,
                "border-error": isError,
              },
              {
                "border-error": error,
              }
            )}
            onClick={onClickInput}
            style={{ height: "45px" }}
          >
            {renderIcon && (
              <div className="ml-2 mr-2 height-20">
                {renderIcon({
                  isFocused,
                  color: isError
                    ? ICON_COLOR.error
                    : isFocused
                    ? ICON_COLOR.active
                    : ICON_COLOR.disable,
                })}
              </div>
            )}
            <div className="flex items-center justify-between w-full">
              <div className="flex mr-2">
                {renderInput?.(inputProps) || (
                  <input
                    {...inputProps}
                    onChange={(e) => onChange?.(e.target.value)}
                    autoFocus
                  />
                )}
              </div>
              {tooltip && (
                <Tooltip
                  text={tooltip}
                  isValid={!error && value !== ""}
                  value={value}
                />
              )}
            </div>
          </div>
        </div>
      </label>

      {clues && (
        <ClueList
          clues={clues}
          className={cluesClassName}
          isFocused={isFocused}
        />
      )}
      {example && (
        <div className="text-12 mt-2 text-grayChateau text-start">
          Example: {example}
        </div>
      )}
    </div>
  );
};

export default InputView;
