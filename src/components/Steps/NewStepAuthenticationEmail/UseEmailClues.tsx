import React from "react";
import { ReactComponent as Alert } from "../../Forms/NewInput/icon/alert.svg";
import { IClue } from "../../Forms/NewInput/types";

interface IUseEmailClues {
  clues: IClue[];
  disableLayoutEnter: boolean;
}

const useEmailClues = (
  value: string | undefined,
  error: { message?: string } | undefined,
  recommendationDomains: string[] | undefined = [],
  onApplySuggestion: (domain: string) => void,
  onSubmit?: () => void
): IUseEmailClues => {
  const emailName = value?.split("@")?.[0];
  const domainByLevel = value?.split("@")?.[1]?.split(".");
  const showEnter =
    domainByLevel && domainByLevel.length > 1
      ? domainByLevel.reverse()[0].length >= 2
      : false;

  const [meanDomain] = recommendationDomains;

  return {
    clues: [
      ...recommendationDomains.map((domain) => ({
        renderIcon: () => <>→</>,
        text: `Press ENTER to apply the suggestion: ${emailName}@${domain}`,
        show: !showEnter,
        hotkey: "Enter",
        onSelect: () => onApplySuggestion(domain),
      })),
      {
        renderIcon: () => <>→</>,
        text: `Did you mean ${emailName}@${meanDomain}?`,
        onSelect: () => onApplySuggestion(meanDomain),
        show: !!meanDomain && showEnter,
        type: "error",
        hotkey: "Enter",
      },
      {
        renderIcon: () => <>→</>,
        text: "Press ENTER when done typing",
        show: !meanDomain && showEnter,
        hotkey: "Enter",
        onSelect: () => onSubmit?.(),
      },
      {
        renderIcon: () => <Alert />,
        text: "Please, check if you provided the correct details.",
        type: "error",
        show: !!error,
      },
    ],
    disableLayoutEnter: !(!meanDomain && showEnter),
  };
};

export default useEmailClues;
