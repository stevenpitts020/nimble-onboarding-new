import React from "react";
/* boilerplate stuff below */
import { render, fireEvent, waitFor } from "@testing-library/react";

/* specific to this test */
import { ConsentsProvider, useConsents } from "./ConsentsContext";

const AppInner = () => {
  const { consents, updateConsent } = useConsents();

  const onSetInitialConsent = async () => {
    updateConsent("initial", true);
  };

  const onSetPrivacy = async () => {
    updateConsent("privacyPolicy", true);
  };

  return (
    <div data-testid="provider">
      <p data-testid="initialConsent">{consents.initial.toString()}</p>
      <p data-testid="privacyPolicy">{consents.privacyPolicy.toString()}</p>
      <p data-testid="treatmentPhotos">{consents.treatmentPhotos.toString()}</p>
      <button data-testid="onSetPrivacy" type="button" onClick={onSetPrivacy}>
        Update privacy policy
      </button>
      <button
        data-testid="onSetInitialConsent"
        type="button"
        onClick={onSetInitialConsent}
      >
        Update Initial
      </button>
    </div>
  );
};

// Simplified Boilerplate app
const App = () => (
  <ConsentsProvider>
    <AppInner />
  </ConsentsProvider>
);

describe("AccountRequestDetailProvider", () => {
  it("defaults to false", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/treatmentPhotos/).textContent).toEqual("false");
    expect(getByTestId(/privacyPolicy/).textContent).toEqual("false");
    expect(getByTestId(/initialConsent/).textContent).toEqual("false");
  });

  it("updates state through updateConsent", async () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(/onSetPrivacy/));

    await waitFor(() => {
      const status = getByTestId(/privacyPolicy/).textContent;
      expect(status).toEqual("true");
    });
  });

  it("updates state does not cause side-effects", async () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(/onSetInitialConsent/));

    await waitFor(() => {
      const initialConsent = getByTestId(/initialConsent/).textContent;
      expect(initialConsent).toEqual("true");

      const status = getByTestId(/privacyPolicy/).textContent;
      expect(status).toEqual("false");
    });
  });
});
