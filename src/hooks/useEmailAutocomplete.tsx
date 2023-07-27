import popularEmails from "../utils/constants/popularEmails";
import levenshteinDistance from "../support/levenshteinDistance";
import { useMemo } from "react";

const commonChars = (str1, str2) =>
  str1
    .split("")
    .map((char) => str2.includes(char))
    .filter((item) => item).length;

const useEmailAutocomplete = (email, count = 1) => {
  return useMemo(() => {
    if (email) {
      const domain = email.split("@")[1];
      if (domain) {
        const recommendation = popularEmails
          .map((popularDomain) => ({
            domain: popularDomain,
            distance: levenshteinDistance(domain, popularDomain),
            commonChars: commonChars(domain, popularDomain),
          }))
          .sort((domain1, domain2) =>
            domain2.commonChars - domain1.commonChars === 0
              ? domain1.distance - domain2.distance
              : domain2.commonChars - domain1.commonChars
          );

        if (recommendation[0].distance === 0) {
          return [];
        }
        return recommendation.slice(0, count).map(({ domain }) => domain);
      }
    }
    return [];
  }, [email]);
};

export default useEmailAutocomplete;
