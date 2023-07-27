import { useCallback, useEffect, useRef } from "react";
import useHotKey from "./useHotKey";

const useEnterHotKey = (callback?: () => void, active = true) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const onHotKey = useCallback(
    (keysPressed, event) => {
      if (active && event.key === "Enter") {
        callbackRef.current?.();
      }
    },
    [active]
  );

  useHotKey(onHotKey);
};

export default useEnterHotKey;
