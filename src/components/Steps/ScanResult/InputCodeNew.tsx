import React, {
  useState,
  useRef,
  MutableRefObject,
  Fragment,
  useEffect,
} from "react";
import clsx from "clsx";
import { IInputCode } from "./types";
import { BACKSPACE } from "../../../utils/constants/variables";

const InputCode = ({
  value,
  length,
  loading,
  onComplete,
  inputRef,
  onFocus,
  onBlur,
  onKeyDown,
}: IInputCode) => {
  const [code, setCode] = useState(
    [...(value?.split("") || []), ...[...Array(length)].fill("")].slice(
      0,
      length
    )
  );
  const inputs: MutableRefObject<any> = useRef([]);

  useEffect(() => {
    if (value) {
      setCode(value?.split(""));
    }
  }, [value]);
  const processInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const num = e.target.value;
    if (/[a-zA-Z]{2}[0-9]{7}/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every((num) => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.keyCode === BACKSPACE && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div className="flex flex-1 items-center w-100">
      {code.map((num, idx) => (
        <Fragment key={idx}>
          <div className={clsx("w-6 h-7", { "ml-[5px]": idx !== 0 })}>
            <input
              type="text"
              id="floating_outlined"
              className={clsx(
                "block group rounded-sm text-center focus:outline-none w-6 h-7 font-inter font-black text-white peer text-18/23",
                { "bg-main-accent": !!code[idx], "bg-[#F2F7FB]": !code[idx] }
              )}
              placeholder="0"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoComplete="off"
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={(e) => processInput(e, idx)}
              onKeyUp={(e) => onKeyUp(e, idx)}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
              ref={(ref) => {
                inputs.current.push(ref);
                if (idx === 0 && inputRef) {
                  inputRef.current = ref;
                }
              }}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default InputCode;
