import React from "react";
/* boilerplate stuff below */
import { render, fireEvent, waitFor } from "@testing-library/react";

/* specific to this test */
import { LoadingProvider, useLoading } from "./LoadingContext";

const AppInner = () => {
  const { loading, setLoading } = useLoading();

  const resolve = async () => {
    setLoading(true);
  };

  const cancel = async () => {
    setLoading(false);
  };

  return (
    <div data-testid="provider">
      <p data-testid="status">{loading ? "loading" : "stopped"}</p>
      <button data-testid="cancel" type="button" onClick={cancel}>
        cancel
      </button>
      <button data-testid="resolve" type="button" onClick={resolve}>
        resolve
      </button>
    </div>
  );
};

// Simplified Boilerplate app
const App = () => (
  <LoadingProvider>
    <AppInner />
  </LoadingProvider>
);

describe("Loading", () => {
  it("defaults to empty state", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/status/).textContent).toEqual("stopped");
  });

  it("should update state with cancel", async () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(/cancel/));

    await waitFor(() => {
      expect(getByTestId(/status/).textContent).toEqual("stopped");
    });
  });

  it("should update state with resolve", async () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(/resolve/));

    await waitFor(() => {
      expect(getByTestId(/status/).textContent).toEqual("loading");
    });
  });
});
