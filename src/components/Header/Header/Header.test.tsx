import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Header from "./Header";
import { InstitutionContext } from "../../../store/InstitutionContext";
import { mockInstitution } from "../../../services/__mocks__/Institution";
import { LayoutContext } from "../../../store/LayoutContext";

const MockLayout = {
  goToNext: () => {},
  goToBack: () => {},
  setShowBackButton: () => {},
  setShowNextButton: () => {},
  setShowSideBar: () => {},
  setShowLogoSideBar: () => {},
  setShowTimer: () => {},
  setShowLogoHeader: () => {},
};

const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "test-me",
  };
  return render(
    <LayoutContext.Provider value={{ ...MockLayout, showLogoHeader: true }}>
      <Router>
        <InstitutionContext.Provider value={mockInstitution}>
          <Header {...defaultProps} {...props} />
        </InstitutionContext.Provider>
      </Router>
    </LayoutContext.Provider>
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
