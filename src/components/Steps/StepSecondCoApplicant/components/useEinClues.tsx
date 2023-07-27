import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Keyboard } from "../../../Forms/NewInput/icon/keyboard.svg";
import { ReactComponent as Lock } from "../../../Forms/NewInput/icon/lock.svg";
import { ReactComponent as Enter } from "../../../Forms/NewInput/icon/enter.svg";
import { ReactComponent as Alert } from "../../../Forms/NewInput/icon/alert.svg";
import { IClue } from "../../../Forms/NewInput/types";

const useEinClues = (
  value: string | undefined,
  error: { message?: string } | undefined,
  isComplete: boolean
): IClue[] => {
  const history = useHistory();

  return useMemo<IClue[]>(
    () => [
      {
        renderIcon: () => <Keyboard />,
        text: () => (
          <>
            By continuing you consent to{" "}
            <u>e-communication disclosures & other terms and conditions</u>.
          </>
        ),
        onSelect: () => {
          history.push("/onboarding/terms-and-conditions");
        },
        show: !value && !error,
      },
      {
        renderIcon: () => <Lock />,
        text: "By providing your ein number you agree that it may be used to authenticate your account. One of the ways we authenticate your identity is by cell phone registry, device model, and location. We may text you to verify your identity and to provide service-related alerts. Message and data rates may apply. If you do not have a mobile number, use your home phone number. This number will not be used for marketing or advertising purposes. ",
        show: !!value?.length && !isComplete && !error,
      },
      {
        renderIcon: () => <Enter />,
        text: "Press ENTER when done typing",
        show: !!value && isComplete && !error,
      },
      {
        renderIcon: () => <Alert />,
        text: `Error. ${error?.message}`,
        type: "error",
        show: !!error,
      },
    ],
    [value, error]
  );
};

export default useEinClues;
