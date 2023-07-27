import { MutableRefObject, useEffect } from "react";

const DetectClickOutside = (
  ref: MutableRefObject<HTMLDivElement | null>,
  callback: any
) => {
  const handleClick = (e: Event) => {
    // https://stackoverflow.com/a/43851475
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default DetectClickOutside;
