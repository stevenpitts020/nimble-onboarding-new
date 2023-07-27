import React, { useMemo } from "react";
import { IClue } from "../../Forms/NewInput/types";
import { ReactComponent as Alert } from "../../Forms/NewInput/icon/alert.svg";

const usePhoneClues = (
  value: string | undefined,
  error: { message?: string } | undefined
): IClue[] => {
  return useMemo<IClue[]>(
    () => [
      {
        renderIcon: () => <Alert />,
        text: "Please, check if you provided the correct details.",
        type: "error",
        show: !!error,
      },
    ],
    [error]
  );
};

export default usePhoneClues;
