import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Header from "./Header";
import { InstitutionContext } from "../../../store/InstitutionContext";
import { mockInstitution } from "../../../services/__mocks__/Institution";

const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "test-me",
  };
  return render(
    <Router>
      <InstitutionContext.Provider value={mockInstitution}>
        <Header {...defaultProps} {...props} />
      </InstitutionContext.Provider>
    </Router>
  );
};

describe("Header", () => {
  test("renders header", () => {
    renderWithProps({
      className: "cenas",
    });

    expect(
      screen.getByAltText("Central Bank logo").getAttribute("src")
    ).toEqual(mockInstitution.logoUri.default);
  });
});
