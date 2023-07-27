import React from "react";
/* boilerplate stuff below */
import { render, fireEvent, waitFor } from "@testing-library/react";

/* specific to this test */
import {
  DocumentsProvider,
  useDocumentState,
  useDocumentDispatch,
  uploadDocument,
} from "./DocumentsContext";
import * as mocks from "../services/__mocks__/Photos";

const AppInner = () => {
  const { documents, status, error } = useDocumentState();
  const dispatch = useDocumentDispatch();

  const create = async () => {
    await uploadDocument(dispatch, "xpto1,123", "front", "institutionidmock");
    await uploadDocument(dispatch, "xpto2,124", "back", "institutionidmock");
    await uploadDocument(dispatch, "xpto3,125", "selfie", "institutionidmock");
  };

  const createError = async () => {
    await uploadDocument(dispatch, "xpto1,test", "front", "error");
  };

  const resolve = async () => {
    dispatch({ type: "resolve", subject: "front", payload: { id: "xpto" } });
  };

  const cancel = async () => {
    dispatch({ type: "cancel" });
  };

  return (
    <div data-testid="provider">
      <p data-testid="status">{status}</p>
      <p data-testid="error">{error}</p>
      <p data-testid="detail">
        {documents.front && <img alt="front" id={documents.front.id} />}
        {documents.back && <img alt="back" id={documents.back.id} />}
        {documents.selfie && <img alt="selfie" id={documents.selfie.id} />}
      </p>
      <button data-testid="uploadError" type="button" onClick={createError}>
        createError
      </button>
      <button data-testid="create" type="button" onClick={create}>
        create
      </button>
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
  <DocumentsProvider>
    <AppInner />
  </DocumentsProvider>
);

describe("AccountRequestDetailProvider", () => {
  it("defaults to empty state", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/status/).textContent).toEqual("idle");
  });

  it("updates state through uploadDocument", async () => {
    const { getByTestId, getByAltText } = render(<App />);

    fireEvent.click(getByTestId(/create/));

    await waitFor(() => {
      const status = getByTestId(/status/).textContent;
      expect(status).toEqual("success");

      expect(getByAltText("front").getAttribute("id")).toEqual(
        mocks.successCreate.id
      );
      expect(getByAltText("back").getAttribute("id")).toEqual(
        mocks.successCreate.id
      );
      expect(getByAltText("selfie").getAttribute("id")).toEqual(
        mocks.successCreate.id
      );
    });
  });

  it("updates error", async () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(/uploadError/));

    await waitFor(() => {
      const result = getByTestId(/error/).textContent;
      expect(result).toEqual(mocks.errorCreate.message);
    });
  });

  it("should update state with dispatch cancel", async () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(/cancel/));

    await waitFor(() => {
      expect(getByTestId(/status/).textContent).toEqual("idle");
    });
  });

  it("should update state with dispatch resolve", async () => {
    const { getByTestId, getByAltText } = render(<App />);

    fireEvent.click(getByTestId(/resolve/));

    await waitFor(() => {
      expect(getByTestId(/status/).textContent).toEqual("success");

      expect(getByAltText("front").getAttribute("id")).toEqual("xpto");
    });
  });
});
