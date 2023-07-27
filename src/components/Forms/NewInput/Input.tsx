import React, { useCallback, useRef, useState } from "react";
import InputView from "./InputView";
import { IInput } from "./types";
import useHotKey from "../../../hooks/useHotKey";

const Input: React.FC<IInput> = (props) => {
  const {
    autoFocus,
    clues,
    onFocus: propsOnFocus,
    onBlur: propsOnBlur,
    isFromCache: isFromCacheProps = false,
    onChange: propsOnChange,
    value,
    error,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFromCache, setIsFromCache] = useState(!!value && isFromCacheProps);
  const timer: { current: NodeJS.Timeout | null } = useRef(null);
  const [isFocused, setIsFocused] = useState(autoFocus || false);

  const onClickInput = useCallback(() => {
    if (inputRef.current && !isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const onFocus = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setIsFocused(true);
    propsOnFocus?.();
  }, [propsOnFocus]);

  const onBlur = useCallback(() => {
    timer.current = setTimeout(() => {
      setIsFocused(false);
      propsOnBlur?.();
    }, 200);
  }, [propsOnBlur]);

  const onKeyDown = useCallback(
    (e) => {
      const isHotkey = clues
        ?.filter(({ show = true }) => show)
        .some(({ hotkey }) => hotkey === e.key);
      if (isHotkey) {
        e.preventDefault();
      }
    },
    [isFocused, clues]
  );

  useHotKey((keysPressed, event) => {
    if (isFocused) {
      const activeClue = clues
        ?.filter(({ show = true }) => show)
        .find(({ hotkey }) => hotkey === event.key);
      if (activeClue) {
        activeClue.onSelect?.();
      }
    }
  });

  const onChange = useCallback((data) => {
    propsOnChange?.(data);
    setIsFromCache(false);
  }, []);

  return (
    <InputView
      props={props}
      inputRef={inputRef}
      onClickInput={onClickInput}
      onFocus={onFocus}
      onBlur={onBlur}
      isFocused={isFocused}
      onKeyDown={onKeyDown}
      isFromCache={isFromCache}
      onChange={onChange}
      error={error}
    />
  );
};

export default Input;
