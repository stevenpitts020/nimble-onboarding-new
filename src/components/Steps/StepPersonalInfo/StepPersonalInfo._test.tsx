/*
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor } from "@testing-library/react";
import StepPersonalInfo from "./StepPersonalInfo";
import { ProspectProvider } from "../../../store";
import { DocumentStateContext } from "../../../store/DocumentsContext";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  const documentProps = {
    status: "idle",
    documents: {
      selfie: { id: "somefrontid", file: "somefrontfile" },
      front: { id: "somefrontid", file: "somefrontfile" },
      back: { id: "somebackid", file: "somebackfile" },
    },
    ...props.documentProviderProps,
  };
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <DocumentStateContext.Provider value={documentProps}>
        <ProspectProvider>
          <StepPersonalInfo {...defaultProps} {...props} />
        </ProspectProvider>
      </DocumentStateContext.Provider>
    </Router>
  );
};

const fillForm = (getByTestId: any) => {
  let input = getByTestId("input-firstName");
  fireEvent.change(input, { target: { value: "John" } });

  input = getByTestId("input-middleName");
  fireEvent.change(input, { target: { value: "M" } });

  input = getByTestId("input-lastName");
  fireEvent.change(input, { target: { value: "Doe" } });

  input = getByTestId("input-dateOfBirth");
  fireEvent.change(input, { target: { value: "1980-10-12" } });

  input = getByTestId("input-phoneNumber");
  fireEvent.change(input, { target: { value: "123123123" } });

  input = getByTestId("input-email");
  fireEvent.change(input, { target: { value: "test@wearesingular.com" } });

  input = getByTestId("input-ssn");
  fireEvent.change(input, { target: { value: "444 444 444" } });

  input = getByTestId("input-address");
  fireEvent.change(input, { target: { value: "street" } });

  input = getByTestId("input-city");
  fireEvent.change(input, { target: { value: "lisbon" } });

  input = getByTestId("select-state");
  fireEvent.change(input, { target: { value: "state" } });

  input = getByTestId("input-zipCode");
  fireEvent.change(input, { target: { value: "zipCode" } });
};

describe("StepPersonalInfo", () => {
  test("renders without error", async () => {
    const { getByTestId, getByText } = renderWithProps({});

    await waitFor(() => {
      const container = getByTestId("StepPersonalInfo");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("ni-test");
    });
    await waitFor(() => {
      const element = getByText(/Legal First Name/i, { selector: "label" });
      expect(element).toBeInTheDocument();
    });
  });

  describe("Submitting information", () => {
    test.skip("after submitting it should go to success step", async () => {
      const { getByTestId } = renderWithProps({});

      fillForm(getByTestId);

      fireEvent.click(getByTestId("step-info-continue"));

      await waitFor(() => {
        const container = getByTestId("StepChooseProducts");
        expect(container).toBeInTheDocument();
      });
    });
  });
});
*/
