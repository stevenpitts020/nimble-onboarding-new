import { useEffect, useRef } from "react";

interface IKeysPressed {
  [k: string]: boolean;
}

const useHotKey = (
  action: (keysPressed: IKeysPressed, event: KeyboardEvent) => void
) => {
  const refAction = useRef(action);

  useEffect(() => {
    refAction.current = action;
  }, [action]);

  useEffect(() => {
    const keysPressed: IKeysPressed = {};

    const keyDown = (event: KeyboardEvent) => {
      keysPressed[event.key] = true;
      refAction.current(keysPressed, event);
    };

    const keyUp = (event: KeyboardEvent) => {
      keysPressed[event.key] = false;
    };

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    return () => {
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
    };
  }, []);
};

export default useHotKey;
